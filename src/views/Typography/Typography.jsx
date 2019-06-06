import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Tabs from "components/CustomTabs/CustomTabs.jsx"
import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.jsx";
import FilterNone from "@material-ui/icons/FilterNone"
import Filter from "@material-ui/icons/Filter"
import { FormControl, InputLabel, Select, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@material-ui/core";
import CardFooter from "../../components/Card/CardFooter";
import $ from "jquery";

const style = {
  ...cardImagesStyles,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
};


// 重构目标：实现分页
function TypographyPage(props) {
  const { classes } = props;

  const [email, setEmail] = React.useState("");

  const [merchants, setMerchants] = React.useState([]);

  const [selectMerchant, setSelectMerchant] = React.useState("");

  const [types, setTypes] = React.useState([]);

  const [timeOptions, setTimeOptions] = React.useState([]);

  const [selectedType, setSelectedType] = React.useState("any");

  const [selectedTime, setSelectedTime] = React.useState(15);

  const [singleFoods, setSingleFoods] = React.useState([]);

  const [multiFoods, setMultiFoods] = React.useState([]);

  const [foodContent, setFoodContent] = React.useState({});

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [foodNum, setFoodNum] = React.useState(1);

  React.useEffect(() => {
    // 设置当前登录用户
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/user/getEmailSession",
      type: "POST",
      success: function (result) {
        if (result !== "none") {
          setEmail(result);
        }
      }
    });
    // 设置菜品类型选择
    $.ajax({
      url: "http://localhost:8080/merchant/getFoodTypes",
      type: "GET",
      success: function (result) {
        setTypes(result.types);
      }
    });
    // 设置时间类型选择
    $.ajax({
      url: "http://localhost:8080/merchant/getTimeOptions",
      type: "GET",
      success: function (result) {
        setTimeOptions(result.timeOptions);
      }
    })
  }, []);

  React.useEffect(() => {
    $.ajax({
      url: "http://localhost:8080/merchant/getMerchants",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "time": selectedTime,
        "type": selectedType
      }),
      success: function (result) {
        setMerchants(result.merchants);
      }
    })
  }, [types, timeOptions, selectedTime, selectedType])

  React.useEffect(() => {
    if (selectMerchant) {
      $.ajax({
        url: "http://localhost:8080/merchant/getFoods",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "merId": selectMerchant,
          "isSingle": true
        }),
        success: function (result) {
          setSingleFoods(result.foods);
        }
      });
      $.ajax({
        url: "http://localhost:8080/merchant/getFoods",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "merId": selectMerchant,
          "isSingle": false
        }),
        success: function (result) {
          setMultiFoods(result.foods);
        }
      });
    }
  }, [selectMerchant])

  const handleTimeSelect = event => {
    setSelectedTime(event.target.value)
  }

  const handleTypeSelect = event => {
    setSelectedType(event.target.value)
  }

  const handleFoodClick = (id, description, event) => {
    setButtonDisabled(false);
    setFoodContent({
      foodId: id,
      description: description
    });
  }

  const handleResClick = (rid, event) => {
    setSelectMerchant(rid);
  };

  const handleNumInput = event => {
    setFoodNum(event.target.value);
  }

  const handleOrderFood = () => {
    console.log(email);
    console.log(foodContent.foodId);
    $.ajax({
      url: "http://localhost:8080/order/orderFood",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "userEmail": email,
        "merId": selectMerchant,
        "foodId": foodContent.foodId,
        "foodNum": foodNum
      }),
      success: function(result) {
        let url = "/pay/" + result.orderId;
        let win = window.open(url, "_blank");
        win.focus();
      }
    })
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>餐厅选择</h4>
            <p className={classes.cardCategoryWhite}>
              请先选择您的期望到达时间
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm md>
                <FormControl required style={{ minWidth: 120 }}>
                  <InputLabel htmlFor="time-limit">送餐时间</InputLabel>
                  <Select
                    value={selectedTime}
                    onChange={handleTimeSelect}
                    name="time"
                    inputProps={{
                      id: "time-limit"
                    }}
                    className={classes.selectEmpty}
                  >
                    {timeOptions.map(row => (
                      <MenuItem key={row.value} value={row.value}>{row.optionName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={3} sm md>
                <FormControl style={{ minWidth: 120 }}>
                  <InputLabel htmlFor="food-type">食品风格</InputLabel>
                  <Select
                    value={selectedType}
                    onChange={handleTypeSelect}
                    name="type"
                    inputProps={{
                      id: "food-type"
                    }}
                    className={classes.selectEmpty}
                  >
                    {types.map(row => (
                      <MenuItem key={row.value} value={row.value}>{row.typeName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={6}></GridItem>
              <GridItem xs={12}>
                <Paper className={classes.root} style={{ marginTop: 10 }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="justify">距离</TableCell>
                        <TableCell align="justify">类型</TableCell>
                        <TableCell align="justify">名称</TableCell>
                        <TableCell align="justify">地点</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {merchants.map(row => (
                        <TableRow key={row.merId} selected={true} hover onClick={(e) => handleResClick(row.merId, e)} style={{ cursor: "pointer" }}>
                          <TableCell align="justify">{(row.distance).toFixed(2)}</TableCell>
                          <TableCell align="justify">{row.type}</TableCell>
                          <TableCell align="justify">{row.name}</TableCell>
                          <TableCell align="justify">{row.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={6} sm={6}>
        <Tabs
          title="单品/套餐:"
          headerColor="rose"
          tabs={[
            {
              tabName: "单品",
              tabIcon: FilterNone,
              tabContent: (
                // style={{ height: 400 }}
                <Paper className={classes.root}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="justify">名称</TableCell>
                        <TableCell align="justify">价格</TableCell>
                        <TableCell align="justify">剩余数量</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {singleFoods.map(row => (
                        <TableRow key={row.foodId} hover onClick={(e) => handleFoodClick(row.foodId, row.description, e)} style={{ cursor: "pointer" }}>
                          <TableCell align="justify">{row.foodName}</TableCell>
                          <TableCell align="justify">{row.foodPrice}</TableCell>
                          <TableCell align="justify">{row.dailyLast}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )
            },
            {
              tabName: "套餐",
              tabIcon: Filter,
              tabContent: (
                <Paper className={classes.root}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="justify">名称</TableCell>
                        <TableCell align="justify">价格</TableCell>
                        <TableCell align="justify">剩余数量</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {multiFoods.map(row => (
                        <TableRow key={row.foodId} hover onClick={(e) => handleFoodClick(row.foodId, row.description, e)} style={{ cursor: "pointer" }}>
                          <TableCell align="justify">{row.foodName}</TableCell>
                          <TableCell align="justify">{row.foodPrice}</TableCell>
                          <TableCell align="justify">{row.dailyLast}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )
            }
          ]}
        >
        </Tabs>
      </GridItem>
      <GridItem xs={6} sm={6}>
        <Card>
          <img
            className={classes.cardImgTop}
            data-src="holder.js/100px180"
            alt="100%x180"
            style={{ height: "180px", width: "100%", display: "block" }}
            src="../../assets/img/paella.jpg"
            data-holder-rendered="true"
          />
          <CardBody>
            <p>{foodContent.description}</p>
          </CardBody>
          <CardFooter>
            <GridContainer>
              <GridItem>
                <TextField
                  required
                  id="foodNum"
                  label="份数"
                  value={foodNum}
                  onChange={handleNumInput}
                  margin="normal"
                />
              </GridItem>
              <GridItem>
                <Button type="button" color="success" onClick={handleOrderFood} style={{ marginTop: "20px" }} disabled={buttonDisabled}>订餐</Button>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>

  );
}

export default withStyles(style)(TypographyPage);

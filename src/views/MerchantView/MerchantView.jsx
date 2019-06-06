import React from "react"
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import FilterNone from "@material-ui/icons/FilterNone";
import Delete from "@material-ui/icons/Delete";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Filter from "@material-ui/icons/Filter"
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardIcon from "../../components/Card/CardIcon";
import CloudOutlined from "@material-ui/icons/CloudUploadOutlined";
import Tabs from "../../components/CustomTabs/CustomTabs"
import { FormControl, InputLabel, Select, MenuItem, TextField, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, OutlinedInput } from "@material-ui/core";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
import image from "assets/img/paella.jpg";
import $ from "jquery"

const styles = {
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
  cardTitle: {
    marginTop: "0",
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
}

class MerchantView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      email: "",
      name: "",
      location: "",
      types: [],
      selectedType: "",
      selectedFood: {},
      infoButtonDisabled: false,
      tableUpdate: false,
    };
  }

  componentDidMount() {
    let that = this;
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/merchant/getMerchantSession",
      type: "POST",
      success: function (result) {
        if (result !== "none") {
          that.setState({
            code: result
          })
        } else {
          if (that.props.history.location.state) {
            let propsMerId = that.props.history.location.state.verifyCode;
            that.setState({
              code: propsMerId
            });
            $.ajax({
              xhrFields: {
                withCredentials: true
              },
              url: "http://localhost:8080/merchant/putMerchantSession",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                "merId": propsMerId
              }),
              success: function(result) {
                console.log("putSession: " + result);
              }
            })
          }
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.code !== this.state.code) {
      let json = {
        "code": this.state.code
      }
      let that = this;
      $.ajax({
        url: "http://localhost:8080/merchant/getFoodTypes",
        type: "GET",
        success: function (result) {
          that.setState({
            types: result.types
          })
        }
      })
      $.ajax({
        url: "http://localhost:8080/merchant/getInfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: function (result) {
          if (result.status) {
            that.setState({
              email: result.email,
              name: result.name,
              selectedType: result.type,
              location: result.location
            })
          } else {
            alert(result.message);
          }
        }
      })      
    }
  }

  selectFood = foodObject => {
    this.setState({
      selectedFood: foodObject
    })
  }

  handleSelect = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChangeInfo = () => {
    this.setState({ infoButtonDisabled: true })
    let code = this.state.code;
    let email = this.state.email;
    let name = this.state.name;
    let type = this.state.selectedType;
    let location = this.state.location;

    let info = {
      "code": code,
      "email": email,
      "name": name,
      "type": type,
      "location": location
    };
    let that = this;

    $.ajax({
      url: "http://localhost:8080/merchant/setInfo",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(info),
      success: function (result) {
        if (result.status) {
          that.setState({ infoButtonDisabled: false })
        }
      }
    })
  }

  updateTable = () => {
    this.setState(prevState => {
      return { tableUpdate: !prevState.tableUpdate }
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <InfoOutlined />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>基本信息</h4>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="merchantCode"
                      label="固定编码"
                      value={this.state.code}
                      style={{ width: 200 }}
                      onChange={this.handleChange}
                      margin="dense"
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="email"
                      label="电子邮箱"
                      value={this.state.email}
                      type="email"
                      name="email"
                      autoComplete="email"
                      margin="dense"
                      style={{ width: 200 }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      required
                      id="name"
                      label="名称"
                      value={this.state.name}
                      style={{ width: 200 }}
                      margin="dense"
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      required
                      id="location"
                      label="地点"
                      value={this.state.location}
                      style={{ width: 200 }}
                      margin="dense"
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl style={{ minWidth: 200, marginTop: 6 }}>
                      <InputLabel htmlFor="food-type">餐厅类型</InputLabel>
                      <Select
                        value={this.state.selectedType}
                        onChange={this.handleSelect}
                        name="type"
                        inputProps={{
                          id: "food-type"
                        }}
                        className={classes.selectEmpty}
                      >
                        {this.state.types.map(row => (
                          <MenuItem key={row.value} value={row.value}>{row.typeName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="button" color="info" disabled={this.state.infoButtonDisabled} onClick={this.handleChangeInfo}>提交</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>餐品发布</h4>
              </CardHeader>
              <CardBody>
                <ReleaseFood ID={this.state.code} selectedFood={this.state.selectedFood} shouldUpdate={this.updateTable} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Tabs
              title="已发布:"
              headerColor="info"
              tabs={[
                {
                  tabName: "单品",
                  tabIcon: FilterNone,
                  tabContent: (<ShowFoods ID={this.state.code} isSingle={true} update={this.state.tableUpdate} select={this.selectFood.bind(this)} styleName={styles} />)
                },
                {
                  tabName: "套餐",
                  tabIcon: Filter,
                  tabContent: (<ShowFoods ID={this.state.code} isSingle={false} update={this.state.tableUpdate} select={this.selectFood.bind(this)} styleName={styles} />)
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

class ReleaseFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleTypes: [
        {
          value: true,
          name: "单品"
        },
        {
          value: false,
          name: "套餐"
        }
      ],
      isSingle: "",
      foodId: "none",
      foodName: "",
      foodPrice: 0,
      foodDiscount: 0,
      dailyMount: 0,
      dailyLast: 0,
      description: "",
      submitDisabled: false,
      deleteDisabled: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedFood !== this.props.selectedFood) {
      let data = this.props.selectedFood;
      this.setState({
        isSingle: data.isSingle,
        foodId: data.foodId,
        foodName: data.foodName,
        foodPrice: data.foodPrice,
        foodDiscount: data.foodDiscount,
        dailyMount: data.dailyMount,
        dailyLast: data.dailyLast,
        description: data.description,
        submitDisabled: false,
        deleteDisabled: false
      })
    }
  }

  handleSelect = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange = event => {
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleClear = () => {
    this.setState({
      isSingle: "",
      foodId: "none",
      foodName: "",
      foodPrice: 0,
      foodDiscount: 0,
      dailyMount: 0,
      dailyLast: 0,
      description: "",
      deleteDisabled: true
    })
  }

  handleDelete = () => {
    this.setState({ deleteDisabled: true })
    let foodId = this.state.foodId;
    let data = { "foodId": foodId };
    let that = this;

    $.ajax({
      url: "http://localhost:8080/merchant/publishFood",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        if (result.status) {
          that.handleClear();
        } else {
          that.setState({ deleteDisabled: false })
        }
      }
    })
  }

  handleSubmit = () => {
    this.setState({ submitDisabled: true })
    let merId = this.props.ID;
    let isSingle = this.state.isSingle;
    let foodId = this.state.foodId;
    let foodName = this.state.foodName;
    let foodPrice = this.state.foodPrice;
    let foodDiscount = this.state.foodDiscount;
    let dailyMount = this.state.dailyMount;
    let dailyLast = this.state.dailyLast;
    let description = this.state.description;

    let data = {
      "merId": merId,
      "isSingle": isSingle,
      "foodId": foodId,
      "foodName": foodName,
      "foodPrice": foodPrice,
      "foodDiscount": foodDiscount,
      "dailyMount": dailyMount,
      "dailyLast": dailyLast,
      "description": description
    }
    let that = this;

    if (isSingle !== "" && this.judgeNotNull(foodId) && this.judgeNotNull(foodName)) {
      $.ajax({
        url: "http://localhost:8080/merchant/publishFood",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
          that.shouldUpdate();
          that.handleClear();
          that.setState({ submitDisabled: false });
        }
      })
    } else {
      alert("您有信息未填写！")
    }
  }

  shouldUpdate = () => {
    this.props.shouldUpdate();
  }

  judgeNotNull = (str) => {
    if (str && (str.replace(/(^s*)|(s*$)/g, "").length !== 0)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <GridContainer align="flex-start">
          <GridItem xs={12} sm={4} md={4}>
            <Button color="warning" simple onClick={this.handleClear}><DeleteOutlined />清空填写内容</Button>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Button color="rose" simple><CloudOutlined />上传图片</Button>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <FormControl variant="outlined" style={{ minWidth: 160, marginTop: 6 }}>
              <InputLabel htmlFor="isSingle">是否单品</InputLabel>
              <Select
                value={this.state.isSingle}
                onChange={this.handleSelect}
                input={
                  <OutlinedInput
                    labelWidth={160}
                    name="isSingle"
                    id="isSingle"
                  />
                }
              >
                {this.state.singleTypes.map(row => (
                  <MenuItem key={row.value} value={row.value}>{row.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <TextField
              id="foodName"
              label="名称"
              type="name"
              name="foodName"
              margin="normal"
              value={this.state.foodName}
              required
              style={{ width: 160 }}
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <TextField
              id="foodPrice"
              label="价格"
              type="number"
              margin="normal"
              value={this.state.foodPrice}
              required
              style={{ width: 160 }}
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <TextField
              id="foodDiscount"
              label="折扣"
              type="number"
              margin="normal"
              value={this.state.foodDiscount}
              style={{ width: 160 }}
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <TextField
              id="dailyMount"
              label="每日数量"
              type="number"
              margin="normal"
              value={this.state.dailyMount}
              required
              style={{ width: 160 }}
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <TextField
              id="dailyLast"
              label="剩余数量"
              type="number"
              margin="normal"
              value={this.state.dailyLast}
              style={{ width: 160 }}
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <TextField
              id="description"
              multiline
              rows="4"
              label="详细描述"
              value={this.state.description}
              margin="normal"
              fullWidth
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem>
            <Button type="button" color="info" style={{ marginTop: 10 }} onClick={this.handleSubmit}>提交</Button>
          </GridItem>
          <GridItem>
            <Button type="button" color="danger" disabled={this.state.deleteDisabled} style={{ marginTop: 10 }} onClick={this.handleDelete}><Delete />删除餐品</Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

class ShowFoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: []
    }
  }
  componentDidMount() {
    console.log("mounted");
    this.getFoodData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getFoodData();
    }
  }

  getFoodData = () => {
    let id = this.props.ID;
    let isSingle = this.props.isSingle;

    let json = {
      "merId": id,
      "isSingle": isSingle
    }
    let that = this;
    $.ajax({
      url: "http://localhost:8080/merchant/getFoods",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function (data) {
        that.setState({ foodData: data.foods })
      }
    })
  }

  valueToFood = food => {
    this.props.select(food);
  }

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Paper className={styles.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="justify">图片</TableCell>
                <TableCell align="justify">名称</TableCell>
                <TableCell align="justify">价格(元)</TableCell>
                <TableCell align="justify">折扣</TableCell>
                <TableCell align="justify">数量</TableCell>
                <TableCell align="justify">剩余</TableCell>
                <TableCell align="justify">详细信息</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.foodData.map(row => (
                <TableRow key={row.foodId} hover style={{ cursor: "pointer" }} onClick={this.valueToFood.bind(this, row)}>
                  <TableCell align="justify"><Avatar alt="图片" src={image} /></TableCell>
                  <TableCell align="justify">{row.foodName}</TableCell>
                  <TableCell align="justify">{row.foodPrice}</TableCell>
                  <TableCell align="justify">{row.foodDiscount}</TableCell>
                  <TableCell align="justify">{row.dailyMount}</TableCell>
                  <TableCell align="justify">{row.dailyLast}</TableCell>
                  <TableCell align="justify">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>);
  }
}

export default withStyles(styles)(MerchantView)
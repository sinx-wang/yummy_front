/* eslint-disable no-console */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
// import InfoOutlined from "@material-ui/icons/InfoOutlined";
import FilterNone from "@material-ui/icons/FilterNone";
// import Delete from "@material-ui/icons/Delete";
// import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Filter from "@material-ui/icons/Filter";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
// import CardIcon from "../../components/Card/CardIcon";
import CloudOutlined from "@material-ui/icons/CloudUploadOutlined";
import Tabs from "../../components/CustomTabs/CustomTabs";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar
  // OutlinedInput
} from "@material-ui/core";
// import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
// import image from "assets/img/paella.jpg";
// import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import $ from "jquery";

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
};

const foods = [
  {
    foodId: 1,
    img: "../../assets/img/burgers.jpg",
    foodName: "hunburger1",
    foodPrice: 12.0,
    foodDiscount: 8,
    dailyMount: 20,
    dailyLast: 8,
    description: "no description"
  },
  {
    foodId: 2,
    img: "../../assets/img/burgers.jpg",
    foodName: "hunburger2",
    foodPrice: 12.0,
    foodDiscount: 8,
    dailyMount: 20,
    dailyLast: 8,
    description: "no description"
  },
  {
    foodId: 3,
    img: "../../assets/img/burgers.jpg",
    foodName: "hunburger3",
    foodPrice: 12.0,
    foodDiscount: 8,
    dailyMount: 20,
    dailyLast: 8,
    description: "no description"
  }
];

const meals = [
  {
    foodId: 1,
    img: "../../assets/img/burgers.jpg",
    foodName: "meal1",
    foodPrice: 12.0,
    foodDiscount: 8,
    dailyMount: 20,
    dailyLast: 8,
    description: "no description"
  },
  {
    foodId: 2,
    img: "../../assets/img/burgers.jpg",
    foodName: "meal2",
    foodPrice: 12.0,
    foodDiscount: 8,
    dailyMount: 20,
    dailyLast: 8,
    description: "no description"
  },
  {
    foodId: 3,
    img: "../../assets/img/burgers.jpg",
    foodName: "meal3",
    foodPrice: 12.0,
    foodDiscount: 8,
    dailyMount: 20,
    dailyLast: 8,
    description: "no description"
  }
];

class MerchantView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableUpdate: false
    };
  }

  // componentDidMount() {
  //   let that = this;
  //   $.ajax({
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     url: "http://localhost:8080/merchant/getMerchantSession",
  //     type: "POST",
  //     success: function(result) {
  //       if (result !== "none") {
  //         that.setState({
  //           code: result
  //         });
  //       } else {
  //         if (that.props.history.location.state) {
  //           let propsMerId = that.props.history.location.state.verifyCode;
  //           that.setState({
  //             code: propsMerId
  //           });
  //           $.ajax({
  //             xhrFields: {
  //               withCredentials: true
  //             },
  //             url: "http://localhost:8080/merchant/putMerchantSession",
  //             type: "POST",
  //             contentType: "application/json",
  //             data: JSON.stringify({
  //               merId: propsMerId
  //             }),
  //             success: function(result) {
  //               console.log("putSession: " + result);
  //             }
  //           });
  //         }
  //       }
  //     }
  //   });
  // }

  selectFood = foodObject => {
    this.setState({
      selectedFood: foodObject
    });
  };

  updateTable = () => {
    this.setState(prevState => {
      return { tableUpdate: !prevState.tableUpdate };
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Tabs
              title="已发布:"
              headerColor="info"
              tabs={[
                {
                  tabName: "单品",
                  tabIcon: FilterNone,
                  tabContent: (
                    <ShowFoods
                      ID={this.state.code}
                      isSingle={true}
                      update={this.state.tableUpdate}
                      select={this.selectFood.bind(this)}
                      styleName={styles}
                    />
                  )
                },
                {
                  tabName: "套餐",
                  tabIcon: Filter,
                  tabContent: (
                    <ShowFoods
                      ID={this.state.code}
                      isSingle={false}
                      update={this.state.tableUpdate}
                      select={this.selectFood.bind(this)}
                      styleName={styles}
                    />
                  )
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                  tabName: "增加",
                  tabIcon: AddIcon,
                  tabContent: (
                    <Card>
                      <CardHeader color="primary">
                        <p
                          style={{
                            marginTop: "3px",
                            marginBottom: "3px",
                            fontSize: "20px"
                          }}
                        >
                          餐品发布
                        </p>
                      </CardHeader>
                      <CardBody>
                        <ReleaseFood
                          ID={this.state.code}
                          isEdit={false}
                          shouldUpdate={this.updateTable}
                        />
                      </CardBody>
                    </Card>
                  )
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
    console.log(props.index);
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
      deleteDisabled: true
    };
  }
  componentDidMount() {
    let data = this.props.selectedFood;
    if (data != null) {
      console.log(data);
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
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedFood !== this.props.selectedFood) {
      let data = this.props.selectedFood;
      if (data != null) {
        console.log(data);
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
        });
      }
    }
  }

  handleSelect = event => {
    console.log(event.target.name + " " + event.target.value);
    this.setState({
      isSingle: event.target.value
    });
  };

  handleChange = event => {
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

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
    });
  };

  // handleDelete = () => {
  //   this.setState({ deleteDisabled: true });
  //   let foodId = this.state.foodId;
  //   let data = { foodId: foodId };
  //   let that = this;

  //   $.ajax({
  //     url: "http://localhost:8080/merchant/publishFood",
  //     type: "POST",
  //     contentType: "application/json",
  //     data: JSON.stringify(data),
  //     success: function(result) {
  //       if (result.status) {
  //         that.handleClear();
  //       } else {
  //         that.setState({ deleteDisabled: false });
  //       }
  //     }
  //   });
  // };

  // handleSubmit = () => {
  //   this.setState({ submitDisabled: true });
  //   let merId = this.props.ID;
  //   let isSingle = this.state.isSingle;
  //   let foodId = this.state.foodId;
  //   let foodName = this.state.foodName;
  //   let foodPrice = this.state.foodPrice;
  //   let foodDiscount = this.state.foodDiscount;
  //   let dailyMount = this.state.dailyMount;
  //   let dailyLast = this.state.dailyLast;
  //   let description = this.state.description;

  //   let data = {
  //     merId: merId,
  //     isSingle: isSingle,
  //     foodId: foodId,
  //     foodName: foodName,
  //     foodPrice: foodPrice,
  //     foodDiscount: foodDiscount,
  //     dailyMount: dailyMount,
  //     dailyLast: dailyLast,
  //     description: description
  //   };
  //   let that = this;

  //   if (
  //     isSingle !== "" &&
  //     this.judgeNotNull(foodId) &&
  //     this.judgeNotNull(foodName)
  //   ) {
  //     $.ajax({
  //       url: "http://localhost:8080/merchant/publishFood",
  //       type: "POST",
  //       contentType: "application/json",
  //       data: JSON.stringify(data),
  //       success: function(result) {
  //         that.shouldUpdate();
  //         that.handleClear();
  //         that.setState({ submitDisabled: false });
  //       }
  //     });
  //   } else {
  //     alert("您有信息未填写！");
  //   }
  // };

  shouldUpdate = () => {
    this.props.shouldUpdate();
  };

  judgeNotNull = str => {
    if (str && str.replace(/(^s*)|(s*$)/g, "").length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  confirmRelease = () => {
    let food = {
      foodId: this.state.foodId,
      img: "../../assets/img/burgers.jpg",
      foodName: this.state.foodName,
      foodPrice: this.state.foodPrice,
      foodDiscount: this.state.foodDiscount,
      dailyMount: this.state.dailyMount,
      dailyLast: this.state.dailyLast,
      description: this.state.description
    };
    if (this.state.isSingle) {
      foods.push(food);
    } else {
      meals.push(food);
    }
    alert("添加成功!");
  };

  confirmEdit = () => {
    let index = this.props.index;
    let food = {
      foodId: this.state.foodId,
      img: "../../assets/img/burgers.jpg",
      foodName: this.state.foodName,
      foodPrice: this.state.foodPrice,
      foodDiscount: this.state.foodDiscount,
      dailyMount: this.state.dailyMount,
      dailyLast: this.state.dailyLast,
      description: this.state.description
    };
    console.log("food1:" + food.dailyLast);
    this.props.confirmEdit(index, food);
  };

  render() {
    return (
      <div>
        <GridContainer align="flex-start">
          <GridItem xs={12} sm={4} md={4}>
            <Button color="rose" simple>
              <CloudOutlined />
              上传图片
            </Button>
          </GridItem>
          <GridItem xs={12} sm={8} md={8} />
          <GridItem xs={12} sm={4} md={4}>
            <FormControl style={{ minWidth: 160, marginTop: 16 }}>
              <InputLabel htmlFor="isSingle">类型</InputLabel>
              <Select
                value={this.state.isSingle}
                onChange={this.handleSelect}
                inputProps={{
                  readOnly: this.props.isEdit
                }}
              >
                {this.state.singleTypes.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
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
              label="详细描述"
              value={this.state.description}
              margin="normal"
              fullWidth
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} sm={9}>
            {" "}
          </GridItem>
          <GridItem xs={12} sm={3}>
            <Button
              type="button"
              color="info"
              style={{ marginTop: 10 }}
              onClick={() => {
                if (this.props.isEdit) {
                  this.confirmEdit();
                } else {
                  this.confirmRelease();
                }
              }}
            >
              确认
            </Button>
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
      foodData: [],
      openEditDialog: false,
      openDeleteDialog: false,
      currentIndex: 0,
      currentFood: {
        foodId: "",
        img: "",
        foodName: "",
        foodPrice: "",
        foodDiscount: "",
        dailyMount: "",
        dailyLast: "",
        description: ""
      }
    };
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

  handleClickOpenEdit = (index, row) => {
    this.setState({
      openEditDialog: true,
      currentFood: row,
      currentIndex: index
    });
  };

  handleCloseEdit = () => {
    this.setState({ openEditDialog: false });
  };

  handleClickOpenDelete = index => {
    this.setState({ openDeleteDialog: true, currentIndex: index });
  };

  handleCloseDelete = () => {
    this.setState({ openDeleteDialog: false });
  };
  handleConfirmDelete = () => {
    let foodList = this.state.foodData;
    let index = this.state.currentIndex;
    delete foodList[index];
    this.setState({ foodData: foodList, openDeleteDialog: false });
  };

  getFoodData = () => {
    /*
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
    })*/
    if (this.props.isSingle) {
      this.setState({ foodData: foods });
    } else {
      this.setState({ foodData: meals });
    }
  };

  selectFood = row => {
    this.setState({});
  };
  valueToFood = food => {
    this.props.select(food);
  };

  confirmEdit = (index, food) => {
    console.log(index + ":" + food.dailyLast);
    let foodList = this.state.foodData;
    foodList[index] = food;
    this.setState({
      foodData: foodList,
      openEditDialog: false,
      currentFood: food
    });
  };

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Paper className={styles.root}>
          <Table>
            <TableHead>
              <TableRow style={{ height: "70px" }}>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  图片
                </TableCell>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  名称
                </TableCell>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  价格(元)
                </TableCell>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  折扣
                </TableCell>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  数量
                </TableCell>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  剩余
                </TableCell>
                <TableCell style={{ paddingRight: "24px" }} align="justify">
                  详细信息
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.foodData.map((row, index) => (
                <TableRow
                  key={row.foodId}
                  hover
                  style={{
                    cursor: "pointer",
                    height: "70px",
                    paddingRight: "24px"
                  }}
                >
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    <Avatar
                      alt="图片"
                      src={require("../../assets/img/burgers.jpg")}
                    />
                  </TableCell>
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    {row.foodName}
                  </TableCell>
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    {row.foodPrice}
                  </TableCell>
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    {row.foodDiscount}
                  </TableCell>
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    {row.dailyMount}
                  </TableCell>
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    {row.dailyLast}
                  </TableCell>
                  <TableCell style={{ paddingRight: "24px" }} align="justify">
                    {row.description}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => {
                        this.handleClickOpenEdit(index, row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      style={{ paddingLeft: "15px" }}
                      onClick={() => this.handleClickOpenDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={this.state.openEditDialog}
            onClose={this.handleCloseEdit}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <Card>
                <CardHeader color="primary">
                  <p
                    style={{
                      marginTop: "3px",
                      marginBottom: "3px",
                      fontSize: "20px"
                    }}
                  >
                    餐品编辑
                  </p>
                </CardHeader>
                <CardBody>
                  <ReleaseFood
                    ID={this.state.code}
                    isEdit={true}
                    index={this.state.currentIndex}
                    confirmEdit={this.confirmEdit}
                    selectedFood={{
                      isSingle: this.props.isSingle,
                      foodId: this.state.currentFood.foodId,
                      foodName: this.state.currentFood.foodName,
                      foodPrice: this.state.currentFood.foodPrice,
                      foodDiscount: this.state.currentFood.foodDiscount,
                      dailyMount: this.state.currentFood.dailyMount,
                      dailyLast: this.state.currentFood.dailyLast,
                      description: this.state.currentFood.description
                    }}
                    shouldUpdate={this.updateTable}
                  />
                </CardBody>
              </Card>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.openDeleteDialog}
            onClose={this.handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"删除"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                确定要删除这个菜品吗？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseDelete}
                color="primary"
                style={{
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "6px",
                  paddingBottom: "6px"
                }}
              >
                取消
              </Button>
              <Button
                onClick={this.handleConfirmDelete}
                color="primary"
                style={{
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "6px",
                  paddingBottom: "6px"
                }}
                autoFocus
              >
                确认
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MerchantView);

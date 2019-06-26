/* eslint-disable no-console */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import {
  // Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
  // IconButton
} from "@material-ui/core";
// import Done from "@material-ui/icons/Done";
// import Clear from "@material-ui/icons/Clear";
import Button from "../../components/CustomButtons/Button.jsx";
// import AddIcon from "@material-ui/icons/Add";
// import Fab from "@material-ui/core/Fab";

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
  }
};
class Restaurant extends React.Component {
  foods = [
    {
      id: 1,
      img: "../../assets/img/burgers.jpg",
      name: "hunburger1",
      price: 12.0,
      num: 0
    },
    {
      id: 2,
      img: "../../assets/img/burgers.jpg",
      name: "hunburger2",
      price: 12.0,
      num: 0
    },
    {
      id: 3,
      img: "../../assets/img/burgers.jpg",
      name: "hunburger3",
      price: 12.0,
      num: 0
    }
  ];
  meals = [
    {
      id: 1,
      img: "../../assets/img/burgers.jpg",
      name: "meal1",
      price: 22.0,
      num: 0
    },
    {
      id: 2,
      img: "../../assets/img/burgers.jpg",
      name: "meal2",
      price: 22.0,
      num: 0
    },
    {
      id: 3,
      img: "../../assets/img/burgers.jpg",
      name: "meal3",
      price: 22.0,
      num: 0
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      total: 0,
      foods: this.foods,
      meals: this.meals,
      list: this.foods,
      isFoodList: true
    };
  }

  componentDidMount() {
    let urlparam = this.props.location.search;
    let id = urlparam.split("=")[1];
    this.setState({ id: id });
    console.log(urlparam);
    console.log(id);
  }

  handleClickFood = () => {
    let tmpList = this.state.list;
    let foodList = this.state.foods;
    if (!this.state.isFoodList) {
      //之前是套餐列表,要保存之前的状态
      this.setState({ meals: tmpList });
    }
    this.setState({ list: foodList });
    this.setState({ isFoodList: true });
  };

  handleClickMeal = () => {
    let tmpList = this.state.list;
    let mealList = this.state.meals;
    if (this.state.isFoodList) {
      //之前是单品列表,要保存之前的状态
      this.setState({ foods: tmpList });
    }
    this.setState({ list: mealList });
    this.setState({ isFoodList: false });
  };

  render() {
    const { classes } = this.props;
    const addOrMinusFabStyle = {
      width: "25px",
      height: "25px",
      minHeight: "0px"
    };
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={3}>
                    <img
                      style={{
                        height: "200px",
                        width: "200PX",
                        display: "block"
                      }}
                      src={require("../../assets/img/burgers.jpg")}
                    />
                  </GridItem>
                  <GridItem xs={3}>
                    <p>this is a burgur restaurant</p>
                  </GridItem>
                  <GridItem xs={3} />
                  <GridItem xs={3}>
                    <GridContainer>
                      <GridItem xs={12}> </GridItem>
                      <GridItem xs={12}> </GridItem>
                      <GridItem xs={12}>
                        <Button
                          style={{ fontSize: "20px", align: "border" }}
                          color="transparent"
                          onClick={this.handleClickMeal}
                        >
                          套餐
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          style={{ fontSize: "20px" }}
                          color="transparent"
                          onClick={this.handleClickFood}
                        >
                          单品
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图片
                      </TableCell>
                      <TableCell>名称</TableCell>
                      <TableCell>价格</TableCell>
                      <TableCell>数量</TableCell>
                      {/* <TableCell align="right" padding="dense"></TableCell>
                      <TableCell align="right" padding="dense"></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.list.map(item => (
                      <TableRow hover key={item.id}>
                        <TableCell>
                          <img
                            style={{
                              height: "100px",
                              width: "100PX",
                              display: "block"
                            }}
                            src={require("../../assets/img/burgers.jpg")}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell style={{ padding: "5px" }}>
                          {item.num}&nbsp;&nbsp;
                          <Button
                            round
                            color="transparent"
                            style={{ padding: "10px" }}
                            onClick={() => {
                              item.num++;
                              let total = this.state.total + item.price;
                              this.setState({ total: total });
                            }}
                          >
                            +
                          </Button>
                          <Button
                            round
                            color="transparent"
                            style={{ padding: "10px" }}
                            onClick={() => {
                              item.num--;
                              let total = this.state.total - item.price;
                              this.setState({ total: total });
                            }}
                          >
                            -
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter>
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                    paddingLeft: "80%"
                  }}
                >
                  总计：{this.state.total}
                </div>
                <Button color="primary">支付</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Restaurant);

/* eslint-disable no-console */
import React from "react";
import { Interpolation, Svg } from "chartist";
import ChartishGraph from "react-chartist";
import withStyles from "@material-ui/core/styles/withStyles";
import $ from "jquery";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Update from "@material-ui/icons/Update";
import Store from "@material-ui/icons/StoreMallDirectory";
import DateRange from "@material-ui/icons/DateRange";
import Accessibility from "@material-ui/icons/Accessibility";
import AccessTime from "@material-ui/icons/AccessTime";
import CardFooter from "../../components/Card/CardFooter";
import { Icon } from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";

class Statistics extends React.Component {
  state = {
    allMoney: 0,
    todayMerchants: 0,
    todayUsers: 0,
    todayOrders: 0,
    merLabels: [],
    merSeries: [[]],
    userLabels: [],
    userSeires: [[]],
    orderLabels: [],
    orderSeries: [[]],
    userChart: [],
    merchantChart: []
  };

  componentDidMount() {
    let that = this;
    $.ajax({
      url: "http://localhost:8080/manager/getOtherInfo",
      type: "GET",
      success: function(result) {
        that.setState({
          allMoney: result.allMoney,
          todayMerchants: result.todayMerchants,
          todayUsers: result.todayUsers,
          todayOrders: result.todayOrders
        });
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/getWeekMerchantData",
      type: "GET",
      success: function(result) {
        let labelsArray = [];
        let seriesArray = [[]];
        for (let x of result) {
          labelsArray.push(x.time);
          seriesArray[0].push(x.amount);
        }
        that.setState({
          merLabels: labelsArray,
          merSeries: seriesArray
        });
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/getWeekUsersData",
      type: "GET",
      success: function(result) {
        let labelsArray = [];
        let seriesArray = [[]];
        for (let x of result) {
          labelsArray.push(x.time);
          seriesArray[0].push(x.amount);
        }
        that.setState({
          userLabels: labelsArray,
          userSeires: seriesArray
        });
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/getWeekOrdersData",
      type: "GET",
      success: function(result) {
        let labelsArray = [];
        let seriesArray = [[]];
        for (let x of result) {
          labelsArray.push(x.time);
          seriesArray[0].push(x.amount);
        }
        console.log(labelsArray);
        console.log(seriesArray);
        that.setState({
          orderLabels: labelsArray,
          orderSeries: seriesArray
        });
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/getMostUsers",
      type: "GET",
      success: function(result) {
        that.setState({
          userChart: result
        });
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/getMostMerchants",
      type: "GET",
      success: function(result) {
        that.setState({
          merchantChart: result
        });
      }
    });
  }

  render() {
    const { classes } = this.props;

    var delays = 80,
      durations = 500;
    var delays2 = 80,
      durations2 = 500;

    let numOptions = {
      lineSmooth: Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };

    let moneyOptions = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 200,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    };

    let responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];

    let numAnimation = {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    };

    let moneyAnimation = {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    };

    let merData = {
      labels: this.state.merLabels,
      series: this.state.merSeries
    };

    let userData = {
      labels: this.state.userLabels,
      series: this.state.userSeires
    };

    let orderData = {
      labels: this.state.orderLabels,
      series: this.state.orderSeries
    };

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AttachMoney />
                </CardIcon>
                <p className={classes.cardCategory}>总收益</p>
                <h3 className={classes.cardTitle}>
                  {this.state.allMoney} <small>RMB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>新商户</p>
                <h3 className={classes.cardTitle}>
                  +{this.state.todayMerchants}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>新用户</p>
                <h3 className={classes.cardTitle}>+{this.state.todayUsers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>订单数</p>
                <h3 className={classes.cardTitle}>{this.state.todayUsers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartishGraph
                  className="ct-chart"
                  data={merData}
                  type="Line"
                  options={numOptions}
                  listener={numAnimation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>商户数量</h4>
                <p className={classes.cardCategory}>商家总数变化情况</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="info">
                <ChartishGraph
                  className="ct-chart"
                  data={userData}
                  type="Line"
                  options={numOptions}
                  listener={numAnimation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>客户数量</h4>
                <p className={classes.cardCategory}>注册用户总数变化情况</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartishGraph
                  className="ct-chart"
                  data={orderData}
                  type="Bar"
                  options={moneyOptions}
                  responsiveOptions={responsiveOptions}
                  listener={moneyAnimation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>每日订单</h4>
                <p className={classes.cardCategory}>每日订单总金额</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>顾客消费排行</h4>
                <p className={classes.cardCategoryWhite}>总消费额最高的客户</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="rose"
                  tableHead={["Email", "Name", "Level", "Spent"]}
                  tableData={this.state.userChart}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>商家营收排行</h4>
                <p className={classes.cardCategoryWhite}>总营收额最高的商家</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Email", "Type", "Revenue"]}
                  tableData={this.state.merchantChart}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Statistics);

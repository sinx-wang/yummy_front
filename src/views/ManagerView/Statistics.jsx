import React from "react";
import { Interpolation, Svg } from "chartist";
import ChartishGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import DateRange from "@material-ui/icons/DateRange";
import Store from "@material-ui/icons/StoreMallDirectory";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Accessibility from "@material-ui/icons/Accessibility";
import AccessTime from "@material-ui/icons/AccessTime";
import Update from "@material-ui/icons/Update";
import { Icon } from "@material-ui/core";
import SetData from "../../variables/SetData";
import { Input } from "@material-ui/core";
import Table from "../../components/Table/Table";
import { grayColor } from "assets/jss/material-dashboard-react.jsx";
let echarts = require("echarts");

const useStyles = makeStyles({
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  consumeChart: {
    width: 800,
    height: 600
  },
  category: {
    width: 400,
    height: 300
  },
  pieCategory: {
    width: 400,
    height: 400
  },
  formControl: {
    minWidth: 120,
    marginBottom: 0
  }
});

function Statistics() {
  const classes = useStyles();

  const merTypes = [
    {
      value: 0,
      name: "注册时间"
    },
    {
      value: 1,
      name: "地域"
    },
    {
      value: 2,
      name: "平均价格"
    },
    {
      value: 3,
      name: "餐厅类别"
    }
  ];

  const custTypes = [
    {
      value: 0,
      name: "注册时间"
    },
    {
      value: 1,
      name: "地域"
    }
  ];

  const [merType, setMerType] = React.useState({
    mer: 0
  });

  const [custType, setCustType] = React.useState({
    cust: 0
  });

  const handleSelect = event => {
    setMerType(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleCustSelect = event => {
    setCustType(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  React.useEffect(() => {
    getMultiXChart();
    getMerTypeChart();
    getCustTypeChart();
  }, []);

  React.useEffect(() => {
    getMerTypeChart();
  }, [merType]);

  React.useEffect(() => {
    getCustTypeChart();
  }, [custType]);

  const getMultiXChart = () => {
    // 平均售价 - 售出率
    var multiXChart = echarts.init(document.getElementById("multiX"));

    let xData = SetData.getMonthX();
    let y1Data = SetData.allMonthAverPrice;
    let y2Data = SetData.allMonthSellPercen;

    multiXChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false
        }
      },
      legend: {
        data: ["平均售价", "售出率"],
        x: "left"
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          restore: {},
          saveAsImage: {}
        }
      },
      axisPointer: {
        link: { xAxisIndex: "all" }
      },
      grid: [
        {
          left: 50,
          right: 50,
          height: "35%"
        },
        {
          left: 50,
          right: 50,
          top: "55%",
          height: "35%"
        }
      ],
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: { onZero: true },
          data: xData
        },
        {
          gridIndex: 1,
          type: "category",
          boundaryGap: false,
          axisLine: { onZero: true },
          data: xData,
          position: "top"
        }
      ],
      yAxis: [
        {
          name: "平均售价(RMB/份)",
          type: "value",
          max: 35,
          min: 25
        },
        {
          gridIndex: 1,
          name: "售出率(%)",
          type: "value",
          inverse: true,
          min: 80,
          max: 100
        }
      ],
      series: [
        {
          name: "平均售价",
          type: "line",
          symbolSize: 8,
          hoverAnimation: false,
          data: y1Data,
          smooth: true
        },
        {
          name: "售出率",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 8,
          hoverAnimation: false,
          data: y2Data,
          smooth: true
        }
      ]
    });
  };

  const getMerTypeChart = () => {
    var chart = echarts.init(document.getElementById("merType"));

    let xData = [];
    let seriesData = [];
    switch (merType.mer) {
      case 0:
        [...xData] = SetData.getMonthX();
        [...seriesData] = SetData.restMonthRegisterTimeY;
        break;
      case 2:
        [...xData] = SetData.restAverPriceX;
        [...seriesData] = SetData.restMonthAverPriceY;
        break;
      case 3:
        [...xData] = SetData.restType;
        [...seriesData] = SetData.restMonthTypeY;
        break;
      default:
        break;
    }

    chart.setOption({
      legend: {
        show: true,
        data: ["月营收额"]
      },
      angleAxis: {
        type: "category",
        data: xData
      },
      tooltip: {
        show: true,
        formatter: params => {
          let id = params.dataIndex;
          return xData[id] + "<br/>" + seriesData[id] + "元";
        }
      },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: "bar",
          itemStyle: {
            normal: {
              color: "rgba(238,64,0,0.5)"
            }
          },
          data: seriesData,
          coordinateSystem: "polar"
        }
      ]
    });
  };

  const getCustTypeChart = () => {
    var chart = echarts.init(document.getElementById("custType"));

    let xData = [];
    let seriesData = [];
    switch (custType.cust) {
      case 0:
        [...xData] = SetData.getMonthX();
        [...seriesData] = SetData.custMonthRegisterTimeY;
        break;
      case 1:
        [...xData] = SetData.custRegionX;
        [...seriesData] = SetData.custRegionY;
        break;
      default:
        break;
    }

    chart.setOption({
      legend: {
        show: true,
        data: ["月消费额"]
      },
      angleAxis: {
        type: "category",
        data: xData
      },
      tooltip: {
        show: true,
        formatter: params => {
          let id = params.dataIndex;
          return xData[id] + "<br/>" + seriesData[id] + "元";
        }
      },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: "bar",
          itemStyle: {
            normal: {
              color: "rgba(238,64,0,0.5)"
            }
          },
          data: seriesData,
          coordinateSystem: "polar"
        }
      ]
    });
  };

  var delays = 80,
    durations = 500;
  var delays2 = 80,
    durations2 = 500;

  let merchantOptions = {
    lineSmooth: Interpolation.cardinal({
      tension: 0
    }),
    low: 10,
    high: 50,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  };

  let userOptions = {
    lineSmooth: Interpolation.cardinal({
      tension: 0
    }),
    low: 100,
    high: 550,
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
    low: 20000,
    high: 75000,
    chartPadding: {
      top: 0,
      right: 0,
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
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }
    ]
  ];

  let numAnimation = {
    draw: function (data) {
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
    draw: function (data) {
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
    labels: ["1", "2", "3", "4", "5", "6"],
    series: [[19, 22, 29, 35, 42, 47]]
  };

  let userData = {
    labels: ["1", "2", "3", "4", "5", "6"],
    series: [[112, 167, 220, 340, 412, 548]]
  };

  let orderData = {
    labels: ["1", "2", "3", "4", "5", "6"],
    series: [[21084, 33012, 42947, 54991, 65598, 70214]]
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
              <p className={classes.cardCategory}>总营业额</p>
              <h3 className={classes.cardTitle}>70,214</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 1 Month
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
              <p className={classes.cardCategory}>商户总数</p>
              <h3 className={classes.cardTitle}>41</h3>
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
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>用户总数</p>
              <h3 className={classes.cardTitle}>548</h3>
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
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>总订单数</p>
              <h3 className={classes.cardTitle}>2,006</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 1 Month
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
                options={merchantOptions}
                listener={numAnimation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>商户数量</h4>
              <p className={classes.cardCategory}>商家总数变化情况</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Last 6 Months
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
                options={userOptions}
                listener={numAnimation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>客户数量</h4>
              <p className={classes.cardCategory}>注册用户总数变化情况</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Last 6 Months
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
              <h4 className={classes.cardTitle}>营业额</h4>
              <p className={classes.cardCategory}>总营业额变化情况</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Last 6 Months
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>售价变动</h4>
              <p className={classes.cardCategoryWhite}>
                平台平均售价与售出率变动情况
              </p>
            </CardHeader>
            <CardBody>
              <div id="multiX" className={classes.consumeChart} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>营收分类统计</h4>
              <p className={classes.cardCategoryWhite}>
                按照不同标准将商家分类并统计该类商家营收
              </p>
            </CardHeader>
            <CardBody>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="category-select">
                  分类
                </InputLabel>
                <Select
                  value={merType.mer}
                  onChange={handleSelect}
                  input={<Input name="mer" id="category-select" />}
                  name="mer"
                >
                  {merTypes.map(row => (
                    <MenuItem key={row.value} value={row.value}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div id="merType" className={classes.pieCategory} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>商家营收排行</h4>
              <p className={classes.cardCategoryWhite}>营收额最高的商家</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="success"
                tableHead={["Name", "AverPrice", "Type", "Revenue"]}
                tableData={SetData.table1}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>顾客分类统计</h4>
              <p className={classes.cardCategoryWhite}>
                按照不同标准将顾客分类并统计该类顾客消费
              </p>
            </CardHeader>
            <CardBody>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="category-select">
                  分类
                </InputLabel>
                <Select
                  value={custType.cust}
                  onChange={handleCustSelect}
                  input={<Input name="cust" id="category-select" />}
                  name="cust"
                >
                  {custTypes.map(row => (
                    <MenuItem key={row.value} value={row.value}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div id="custType" className={classes.pieCategory} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>顾客消费排行</h4>
              <p className={classes.cardCategoryWhite}>消费额最高的顾客</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["Name", "Register", "Region", "Spent"]}
                tableData={SetData.table2}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default Statistics;

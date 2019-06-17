import React from "react";
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
import ViewDay from "@material-ui/icons/ViewDay";
import Functions from "@material-ui/icons/Functions";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Update from "@material-ui/icons/Update";
import SetData from "../../variables/SetData";
import { Input } from "@material-ui/core";
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
    marginBottom: 0,
    marginLeft: 30
  }
});

function RestStat() {
  const classes = useStyles();

  const times = [
    {
      value: 0,
      name: "季度"
    },
    {
      value: 1,
      name: "年度"
    }
  ];

  const pieTimes = [
    {
      value: 0,
      name: "季度"
    },
    {
      value: 1,
      name: "月度"
    }
  ];

  const [time, setTime] = React.useState({
    made: 1,
    aver: 1,
    td: 1,
    dd: 1
  });

  const handleSelect = event => {
    setTime(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  React.useEffect(() => {
    getMultiXChart();
    getMadeChart();
    getPersonAverChart();
    getTimeDistribution();
    getDistanceDistribution();
    getProfitChart();
  }, []);

  React.useEffect(() => {
    getMadeChart();
    getPersonAverChart();
    getTimeDistribution();
    getDistanceDistribution();
    getProfitChart();
  }, [time]);

  const getMultiXChart = () => {
    // 平均售价 - 售出率
    var multiXChart = echarts.init(document.getElementById("multiX"));

    let xData = SetData.getMonthX();
    let y1Data = SetData.restMonthAverPrice;
    let y2Data = SetData.restMonthSellPercen;

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

  const getMadeChart = () => {
    var madeChart = echarts.init(document.getElementById("made"));

    let xData = [];
    time.made == 1
      ? ([...xData] = SetData.getMonthX())
      : ([...xData] = SetData.getSeasonX());
    let seriesData = [];
    time.made == 1
      ? (seriesData = SetData.restMonthMadePercen)
      : (seriesData = SetData.restSeasonMadePercen());

    madeChart.setOption({
      visualMap: [
        {
          show: false,
          type: "continuous",
          seriesIndex: 0,
          min: 0,
          max: 100
        }
      ],

      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          data: xData
        }
      ],
      yAxis: [
        {
          splitLine: { show: true },
          min: 80
        }
      ],
      series: [
        {
          type: "line",
          showSymbol: false,
          data: seriesData
        }
      ]
    });
  };

  const getPersonAverChart = () => {
    var personAverChart = echarts.init(document.getElementById("average"));

    let xData = [];
    time.aver == 1
      ? ([...xData] = SetData.getMonthX())
      : ([...xData] = SetData.getSeasonX());
    let seriesData = [];
    time.aver == 1
      ? ([...seriesData] = SetData.restPerConsume)
      : ([...seriesData] = SetData.restPerSeasonConsume);

    personAverChart.setOption({
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          data: xData
        }
      ],
      yAxis: [
        {
          splitLine: { show: true },
          min: 30
        }
      ],
      series: [
        {
          type: "line",
          showSymbol: false,
          data: seriesData
        }
      ]
    });
  };

  const getTimeDistribution = () => {
    var chart = echarts.init(document.getElementById("timeDistribution"));

    let data = [];
    time.td == 1
      ? ([...data] = SetData.restMonthOrderDistribution)
      : ([...data] = SetData.restSeasonOrderDistribution);

    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x: "center",
        y: "bottom",
        data: [
          "AM 8~10",
          "AM 10~12",
          "PM 12~2",
          "PM 2~4",
          "PM 4~6",
          "PM 6~8",
          "PM 8~10"
        ]
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          magicType: {
            show: true,
            type: ["pie", "funnel"]
          }
        }
      },
      calculable: true,
      series: [
        {
          name: "时间分布",
          type: "pie",
          radius: [30, 110],
          roseType: "area",
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: data
        }
      ]
    });
  };

  const getDistanceDistribution = () => {
    var chart = echarts.init(document.getElementById("distDistribution"));

    let distances = SetData.restDistance;
    let data = [];
    time.dd == 1
      ? ([...data] = SetData.restMonthDistData)
      : ([...data] = SetData.restSeasonDistData);

    chart.setOption({
      legend: {
        show: true,
        data: ["价格范围"]
      },
      angleAxis: {
        type: "category",
        data: distances
      },
      tooltip: {
        show: true,
        formatter: params => {
          let id = params.dataIndex;
          return distances[id] + "<br/>" + data[id] + "元";
        }
      },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: "bar",
          itemStyle: {
            normal: {
              color: "rgba(72,209,204,0.5)"
            }
          },
          data: data,
          coordinateSystem: "polar"
        }
      ]
    });
  };

  const getProfitChart = () => {
    var chart = echarts.init(document.getElementById("profit"));

    let source = SetData.getFoodProfit();

    chart.on("updateAxisPointer", event => {
      var xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        chart.setOption({
          series: {
            id: "pie",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)"
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });

    chart.setOption({
      legend: {},
      tooltip: {
        trigger: "axis",
        showContent: false
      },
      dataset: {
        source: source
      },
      xAxis: { type: "category" },
      yAxis: [
        {
          gridIndex: 0,
          min: 400
        }
      ],
      grid: { top: "55%" },
      series: [
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        { type: "line", smooth: true, seriesLayoutBy: "row" },
        {
          type: "pie",
          id: "pie",
          radius: "30%",
          center: ["50%", "25%"],
          label: {
            formatter: "{b}: {@2018-7} ({d}%)"
          },
          encode: {
            itemName: "product",
            value: "2018-7",
            tooltip: "2018-7"
          }
        }
      ]
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={4}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <ViewDay />
            </CardIcon>
            <p className={classes.cardCategory}>平均售价</p>
            <h3 className={classes.cardTitle}>
              11.76 <small>RMB</small>
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
      <GridItem xs={12} sm={4}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <Functions />
            </CardIcon>
            <p className={classes.cardCategory}>销售量</p>
            <h3 className={classes.cardTitle}>+17</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              Today
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <AttachMoney />
            </CardIcon>
            <p className={classes.cardCategory}>总利润</p>
            <h3 className={classes.cardTitle}>
              200 <small>RMB</small>
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
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>售价变动</h4>
            <p className={classes.cardCategoryWhite}>
              平均售价与售出率变动情况
            </p>
          </CardHeader>
          <CardBody>
            <div id="multiX" className={classes.consumeChart} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>成交率</h4>
            <p className={classes.cardCategoryWhite}>未退货占总订单中的比例</p>
          </CardHeader>
          <CardBody>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="category-select">
                时间
              </InputLabel>
              <Select
                value={time.made}
                onChange={handleSelect}
                input={<Input name="made" id="category-select" />}
                name="made"
              >
                {times.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div id="made" className={classes.category} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>人均消费</h4>
            <p className={classes.cardCategoryWhite}>每个顾客的平均消费</p>
          </CardHeader>
          <CardBody>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="category-select">
                时间
              </InputLabel>
              <Select
                value={time.aver}
                onChange={handleSelect}
                input={<Input name="aver" id="category-select" />}
                name="aver"
              >
                {times.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div id="average" className={classes.category} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>订单时间分布</h4>
            <p className={classes.cardCategoryWhite}>
              展示订单金额在不同时间段上的分布
            </p>
          </CardHeader>
          <CardBody>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="category-select">
                时间
              </InputLabel>
              <Select
                value={time.td}
                onChange={handleSelect}
                input={<Input name="td" id="category-select" />}
                name="td"
              >
                {pieTimes.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div id="timeDistribution" className={classes.pieCategory} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>订单距离分布</h4>
            <p className={classes.cardCategoryWhite}>
              展示订单金额在不同距离上的分布
            </p>
          </CardHeader>
          <CardBody>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="category-select">
                时间
              </InputLabel>
              <Select
                value={time.dd}
                onChange={handleSelect}
                input={<Input name="dd" id="category-select" />}
                name="dd"
              >
                {pieTimes.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div id="distDistribution" className={classes.pieCategory} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>利润贡献</h4>
            <p className={classes.cardCategoryWhite}>
              查看各种餐品的营收贡献度
            </p>
          </CardHeader>
          <CardBody>
            <div id="profit" className={classes.consumeChart} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default RestStat;

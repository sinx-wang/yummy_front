/* eslint-disable no-console */
import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import SetData from "../../variables/SetData";
import { Input } from "@material-ui/core";
let echarts = require("echarts");

const useStyles = makeStyles({
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
    height: 400
  },
  category: {
    width: 400,
    height: 300
  },
  formControl: {
    minWidth: 120,
    marginBottom: 20
  }
});

function Statistics() {
  const classes = useStyles();

  const [categoryTimeSelect, setCategoryTimeSelect] = React.useState({
    value: 1
  });

  const [typeTimeSelect, setTypeTimeSelect] = React.useState({
    value: 1
  });

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

  React.useEffect(() => {
    getTimeChart();
    getCategoryType();
    getTypeChart();
  }, []);

  React.useEffect(() => {
    getCategoryType();
  }, [categoryTimeSelect]);

  React.useEffect(() => {
    getTypeChart();
  }, [typeTimeSelect]);

  const getTimeChart = () => {
    var consumeChart = echarts.init(document.getElementById("consume"));

    const colors = ["#5793f3", "#d14a61", "#675bba"];
    console.log(SetData.getCustomerSeasonY());

    consumeChart.setOption({
      color: colors,

      tooltip: {
        trigger: "none",
        axisPointer: {
          type: "cross"
        }
      },
      legend: {
        data: ["季度消费", "月度消费"]
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1]
            }
          },
          axisPointer: {
            label: {
              formatter: params => {
                return (
                  "消费额 " +
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              }
            }
          },
          data: SetData.getMonthX()
        },
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0]
            }
          },
          axisPointer: {
            label: {
              formatter: params => {
                return (
                  "消费额 " +
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              }
            }
          },
          data: SetData.getSeasonX()
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "季度",
          type: "line",
          xAxisIndex: 1,
          smooth: true,
          data: SetData.getCustomerSeasonY()
        },
        {
          name: "月度",
          type: "line",
          smooth: true,
          data: SetData.getMonthY()
        }
      ]
    });
  };

  const getCategoryType = () => {
    var categoryChart = echarts.init(document.getElementById("category"));

    let seriesData = [];
    categoryTimeSelect.value == 1
      ? ([...seriesData] = SetData.yearCategoryData)
      : ([...seriesData] = SetData.seasonCategoryData);

    categoryChart.setOption({
      angleAxis: {},
      radiusAxis: {
        type: "category",
        data: SetData.getDistance(),
        z: 10
      },
      polar: {},
      series: [
        {
          type: "bar",
          data: seriesData[0],
          coordinateSystem: "polar",
          name: SetData.restType[0],
          stack: "a"
        },
        {
          type: "bar",
          data: seriesData[1],
          coordinateSystem: "polar",
          name: SetData.restType[1],
          stack: "a"
        },
        {
          type: "bar",
          data: seriesData[2],
          coordinateSystem: "polar",
          name: SetData.restType[2],
          stack: "a"
        },
        {
          type: "bar",
          data: seriesData[3],
          coordinateSystem: "polar",
          name: SetData.restType[3],
          stack: "a"
        }
      ],
      legend: {
        show: true,
        data: SetData.restType
      }
    });
  };

  const getTypeChart = () => {
    var typeChart = echarts.init(document.getElementById("type"));

    let seriesData = [];
    typeTimeSelect.value == 1
      ? ([...seriesData] = SetData.yearTypeData)
      : ([...seriesData] = SetData.seasonTypeData);

    typeChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: SetData.restType
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: seriesData[0], name: SetData.restType[0] },
            { value: seriesData[1], name: SetData.restType[1] },
            { value: seriesData[2], name: SetData.restType[2] },
            { value: seriesData[3], name: SetData.restType[3] }
          ]
        }
      ]
    });
  };

  const handleCategoryChange = event => {
    setCategoryTimeSelect({
      [event.target.name]: event.target.value
    });
  };

  const handleTypeChange = event => {
    setTypeTimeSelect({
      [event.target.name]: event.target.value
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>消费统计</h4>
            <p className={classes.cardCategoryWhite}>
              每期在平台上消费总额统计
            </p>
          </CardHeader>
          <CardBody>
            <div id="consume" className={classes.consumeChart} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>分类统计</h4>
            <p className={classes.cardCategoryWhite}>
              展示消费额与餐厅距离、餐厅种类之关系
            </p>
          </CardHeader>
          <CardBody>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="category-select">
                时间
              </InputLabel>
              <Select
                value={categoryTimeSelect.value}
                onChange={handleCategoryChange}
                input={<Input name="value" id="category-select" />}
                name="value"
              >
                {times.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div id="category" className={classes.category} />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>餐厅种类统计</h4>
            <p className={classes.cardCategoryWhite}>
              展示消费额与餐厅种类关系关系
            </p>
          </CardHeader>
          <CardBody>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="type-select">
                时间
              </InputLabel>
              <Select
                value={typeTimeSelect.value}
                onChange={handleTypeChange}
                input={<Input name="value" id="type-select" />}
                name="value"
              >
                {times.map(row => (
                  <MenuItem key={row.value} value={row.value}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div id="type" className={classes.category} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default Statistics;

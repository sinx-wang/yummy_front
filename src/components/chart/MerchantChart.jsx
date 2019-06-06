import React from "react";
import { Interpolation, Svg } from "chartist";
import ChartistGraph from 'react-chartist';
import $ from "jquery";

function MerchantChart(props) {
  const { classes } = props;

  const [labels, setLabels] = React.useState([]);

  const [series, setSeries] = React.useState([[]]);

  React.useEffect(() => {
    $.ajax({
      url: "http://localhost:8080/manager/getWeekMerchantData",
      type: "GET",
      success: function (result) {
        let labelsArray = [];
        let seriesArray = [[]];
        for (x in result) {
          //x.time x.amount
          labelsArray.push(x.time);
          seriesArray[0].push(x.amount);
        }
        setLabels(labelsArray);
        setSeries(seriesArray);
      }
    })
  }, [])

  React.useEffect(() => {
    console.log(data);
  }, [series])

  let data = {
    labels: labels,
    series: series
  };

  let options = {
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

  let animation = {
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

  return (
    <ChartistGraph
      className="ct-chart"
      data={data}
      type="Line"
      options={options}
      listener={animation}
    />
  )
}

export default MerchantChart;
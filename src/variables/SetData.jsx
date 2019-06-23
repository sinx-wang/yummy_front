/* eslint-disable no-console */
const SetData = {};

const monthX = [
  "2018-7",
  "2018-8",
  "2018-9",
  "2018-10",
  "2018-11",
  "2018-12",
  "2019-1",
  "2019-2",
  "2019-3",
  "2019-4",
  "2019-5",
  "2019-6"
];
const monthY = [62.5, 55.45, 66, 50.5, 57, 43.5, 22, 0, 40, 33.5, 44, 21];

const seasonX = ["2018-III", "2018-IV", "2019-I", "2019-II"];

const getMonthX = () => {
  return monthX;
};

SetData.getMonthX = getMonthX;

const getMonthY = () => {
  return monthY;
};

SetData.getMonthY = getMonthY;

const getSeasonX = () => {
  return seasonX;
};

SetData.getSeasonX = getSeasonX;

const getCustomerSeasonY = () => {
  let [...oriSeasonData] = getMonthY();

  let seasonY = [];
  for (let i = 0; i < 4; i++) {
    let index = i * 3;
    let tempSum =
      oriSeasonData[index] +
      oriSeasonData[index + 1] +
      oriSeasonData[index + 2];
    seasonY.push(tempSum);
  }
  return seasonY;
};

SetData.getCustomerSeasonY = getCustomerSeasonY;

const restType = ["快餐", "经典中餐", "火锅外送", "西餐料理"];

SetData.restType = restType;

const distance = ["< 0.5km", "0.5~2km", "> 2km"];

const getDistance = () => {
  return distance;
};

SetData.getDistance = getDistance;

const seasonCategoryData = [[43, 0, 0], [22, 0, 0], [0, 0, 33.5], [0, 22, 0]];

SetData.seasonCategoryData = seasonCategoryData;

const yearCategoryData = [
  [120, 32, 20],
  [40, 33, 25],
  [0, 50, 45],
  [33, 56, 64]
];

SetData.yearCategoryData = yearCategoryData;

const seasonTypeData = [43, 22, 33.5, 22];

SetData.seasonTypeData = seasonTypeData;

const yearTypeData = [172, 98, 95, 153];

SetData.yearTypeData = yearTypeData;

// 商家平均售价
const restMonthAverPrice = [
  30,
  27.45,
  25,
  28,
  30,
  28.5,
  32,
  29,
  30,
  31.5,
  33,
  32
];
SetData.restMonthAverPrice = restMonthAverPrice;

// 商家售出率
const restMonthSellPercen = [
  85.4,
  88,
  87.25,
  88.1,
  85.22,
  88.7,
  86.3,
  85,
  84.8,
  85.2,
  84.9,
  85
];
SetData.restMonthSellPercen = restMonthSellPercen;

// 商家成交率
const restMonthMadePercen = [98, 90, 89, 89, 92, 90, 96, 91, 90, 94, 96, 88];
SetData.restMonthMadePercen = restMonthMadePercen;

const restSeasonMadePercen = () => {
  let seasonData = [];
  for (let i = 0; i < 4; i += 1) {
    let index = i * 3;
    let tempSum =
      restMonthMadePercen[index] +
      restMonthMadePercen[index + 1] +
      restMonthMadePercen[index + 2];
    let tempAve = tempSum / 3;
    seasonData.push(tempAve);
  }
  return seasonData;
};
SetData.restSeasonMadePercen = restSeasonMadePercen;

// 人均消费
const restPerConsume = [
  46.1,
  45.6,
  41.7,
  49.3,
  44.4,
  50.2,
  49,
  47.5,
  46.6,
  43.9,
  45.6,
  46.5
];
SetData.restPerConsume = restPerConsume;

const restPerSeasonConsume = [45.7, 48.8, 48.1, 44.2];
SetData.restPerSeasonConsume = restPerSeasonConsume;

// 时间分布
const restMonthOrderDistribution = [
  {
    name: "AM 8~10",
    value: 94
  },
  {
    name: "AM 10~12",
    value: 318
  },
  {
    name: "PM 12~2",
    value: 942
  },
  {
    name: "PM 2~4",
    value: 210
  },
  {
    name: "PM 4~6",
    value: 411
  },
  {
    name: "PM 6~8",
    value: 853
  },
  {
    name: "PM 8~10",
    value: 108
  }
];
SetData.restMonthOrderDistribution = restMonthOrderDistribution;
// 2936

const restSeasonOrderDistribution = [
  {
    name: "AM 8~10",
    value: 470
  },
  {
    name: "AM 10~12",
    value: 2884
  },
  {
    name: "PM 12~2",
    value: 3050
  },
  {
    name: "PM 2~4",
    value: 653
  },
  {
    name: "PM 4~6",
    value: 2167
  },
  {
    name: "PM 6~8",
    value: 2586
  },
  {
    name: "PM 8~10",
    value: 375
  }
];
SetData.restSeasonOrderDistribution = restSeasonOrderDistribution;
// 12185

const restDistance = [
  "<500m",
  "0.5~1km",
  "1~1.5km",
  "1.5~2km",
  "2~2.5km",
  ">2.5km"
];
SetData.restDistance = restDistance;

const restMonthDistData = [540, 632, 607, 424, 410, 323];
SetData.restMonthDistData = restMonthDistData;

const restSeasonDistData = [1670, 1975, 1821, 1322, 1365, 847];
SetData.restSeasonDistData = restSeasonDistData;

// 餐品及利润
const getFoodTime = () => {
  let time = ["product"].concat(monthX);
  return time;
};
SetData.getFoodTime = getFoodTime;

const getFoodProfit = () => {
  let [...temp] = getFoodTime();
  return [
    temp,
    ["爆炒花蛤", 566, 571, 569, 567, 568, 571, 576, 577, 583, 572, 585, 590],
    ["锡纸花甲", 467, 480, 490, 524, 510, 488, 475, 492, 500, 477, 470, 466],
    ["葱油蛏子", 672, 670, 655, 631, 649, 673, 688, 700, 694, 681, 677, 680],
    ["铁板鱿鱼", 554, 569, 577, 572, 566, 570, 568, 580, 579, 575, 580, 580],
    ["其他", 558, 557, 559, 553, 556, 558, 554, 555, 561, 559, 561, 568]
  ];
};
SetData.getFoodProfit = getFoodProfit;

const allMonthAverPrice = [
  32,
  30,
  28.5,
  29.5,
  32.5,
  33,
  31,
  29,
  30.5,
  32,
  33,
  33.5
];
SetData.allMonthAverPrice = allMonthAverPrice;

const allMonthSellPercen = [
  98.8,
  96.5,
  98.8,
  94.9,
  98.5,
  94.5,
  96.6,
  96.1,
  95.4,
  96.5,
  99.6,
  95
];
SetData.allMonthSellPercen = allMonthSellPercen;

// 商家平均售价
const restAverPriceX = ["10~15", "15~20", "20~25", "25~30", "30~35", "35~40"];
SetData.restAverPriceX = restAverPriceX;

const restMonthAverPriceY = [1276, 2549, 3200, 2975, 2391, 1877];
SetData.restMonthAverPriceY = restMonthAverPriceY;

const restMonthTypeY = [3123, 2843, 2101, 2566];
SetData.restMonthTypeY = restMonthTypeY;

const restMonthRegisterTimeY = [
  2519,
  2625,
  2408,
  2426,
  2400,
  2471,
  2576,
  2603,
  2400,
  2588,
  2492,
  2490
];
SetData.restMonthRegisterTimeY = restMonthRegisterTimeY;

const custMonthRegisterTimeY = [38, 40, 31, 29, 43, 44, 45, 29, 36, 34, 30, 33];
SetData.custMonthRegisterTimeY = custMonthRegisterTimeY;

const custRegionX = ["南京", "镇江", "无锡", "苏州", "常州"];
SetData.custRegionX = custRegionX;

const custRegionY = [42, 35, 37, 40, 36];
SetData.custRegionY = custRegionY;

const table1 = [
  ["学生第一餐厅", 21, "经典中餐", 3573],
  ["MacDonald", 30, "快餐", 3483],
  ["大卫时尚餐厅", 23, "快餐", 3376],
  ["大小姐的饭", 25, "经典中餐", 3343],
  ["C一点寿司", 27, "西餐料理", 3289],
  ["林聪烤鱼店", 27, "经典中餐", 3240],
  ["花蛤店", 25.5, "经典中餐", 3149]
];
SetData.table1 = table1;

const table2 = [
  ["用户1", "2018-8-23", "南京", 106],
  ["用户2", "2019-4-01", "苏州", 75],
  ["用户3", "2019-5-11", "镇江", 70],
  ["用户4", "2018-12-07", "无锡", 66],
  ["用户5", "2019-7-05", "南京", 66],
  ["用户6", "2018-11-11", "常州", 64]
];
SetData.table2 = table2;

export default SetData;
// const seasonY = monthY

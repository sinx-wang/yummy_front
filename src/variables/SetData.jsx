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

export default SetData;
// const seasonY = monthY

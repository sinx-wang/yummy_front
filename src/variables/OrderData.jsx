import Steps from "./Steps";

let order = {};

let list = [
  {
    orderId: "order1",
    canteen: "超级汉堡王",
    img: require("../assets/img/hunburger1.jpg"),
    total: 36,
    step: Steps.WAITING,
    food: [
      {
        name: "双层厚牛堡",
        price: 36,
        num: 1
      }
    ]
  },
  {
    orderId: "order2",
    canteen: "Pizza小屋",
    img: require("../assets/img/piza1.jpg"),
    total: 92,
    step: Steps.DELIVERING,
    food: [
      {
        name: "鸡肉披萨",
        price: 36,
        num: 2
      },
      {
        name: "水果披萨",
        price: 20,
        num: 1
      }
    ]
  },
  {
    orderId: "order3",
    canteen: "超级汉堡王",
    img: require("../assets/img/hunburger2.jpg"),
    total: 40,
    step: Steps.DONE,
    food: [
      {
        name: "番茄芝士堡",
        price: 20,
        num: 2
      }
    ]
  },
  {
    orderId: "order4",
    canteen: "老王中餐",
    img: require("../assets/img/chfood1.jpg"),
    total: 27,
    step: Steps.DONE,
    food: [
      {
        name: "番茄炒蛋",
        price: 10,
        num: 1
      },
      {
        name: "红烧肉",
        price: 15,
        num: 1
      },
      {
        name: "米饭",
        price: 2,
        num: 1
      }
    ]
  }
];

order.list = list;

export default order;

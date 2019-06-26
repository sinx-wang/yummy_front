const rest = {};

const info = {
  code: "123456",
  email: "1234567890@123.com",
  name: "hunbeger restaurant",
  location: "no address",
  type: "fast food",
};

rest.info = info;

const types = ["快餐", "经典中餐", "火锅外送", "西餐料理"];

rest.types = types;

const foods = [
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

rest.foods = foods;

const meals = [
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

rest.meals = meals;

export default rest;

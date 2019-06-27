const order = {};

const restaurants = [
  {
    id: 1,
    img: "../../assets/img/burgers.jpg",
    name: "restaurant1",
    description: "burgers",
    distance: "<100m"
  },
  {
    id: 2,
    img: "../../assets/img/burgers.jpg",
    name: "restaurant2",
    description: "burgers",
    distance: "<100m"
  },
  {
    id: 3,
    img: "../../assets/img/burgers.jpg",
    name: "restaurant3",
    description: "burgers",
    distance: "<100m"
  },
  {
    id: 4,
    img: "../../assets/img/burgers.jpg",
    name: "restaurant4",
    description: "burgers",
    distance: "<100m"
  }
];

order.restaurants = restaurants;

const list = [
  {
    id: "001",
    canteen: "餐厅一",
    total: 8,
    food: [
      {
        name: "食品1",
        price: 10
      },
      {
        name: "食品2",
        price: 3
      }
    ],
    discount: [
      {
        name: "折扣1",
        price: -5
      }
    ]
  },
  {
    id: "002",
    canteen: "餐厅二",
    total: 10,
    food: [
      {
        name: "食品1",
        price: 10
      },
      {
        name: "食品2",
        price: 5
      }
    ],
    discount: [
      {
        name: "折扣2",
        price: -5
      }
    ]
  }
];

order.list = list;

export default order;

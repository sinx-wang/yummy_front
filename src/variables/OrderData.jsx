const order = {};

const restaurants = [
  {
    id: "rest1",
    img: require("../assets/img/hunburgerLogo.jpg"),
    name: "超级汉堡王",
    description: "反正全是汉堡🍔",
    distance: "<100m"
  },
  {
    id: "rest2",
    img: require("../assets/img/pizaLogo.jpg"),
    name: "Pizza小屋",
    description: "各种🍕披萨一定满足你的口味",
    distance: "<100m"
  },
  {
    id: "rest3",
    img: require("../assets/img/chineseFoodLogo.jpg"),
    name: "老王中餐",
    description: "还是中国人吃得最健康",
    distance: "<100m"
  },
  {
    id: "rest4",
    img: require("../assets/img/saladLogo.jpg"),
    name: "轻食沙拉",
    description: "水果捞、蔬菜捞",
    distance: "<100m"
  },
  {
    id: "rest5",
    img: require("../assets/img/noodleLogo.jpg"),
    name: "西吴面馆",
    description: "江南细面，北方粗面",
    distance: "<100m"
  },
  {
    id: "rest6",
    img: require("../assets/img/soybeanLogo.jpg"),
    name: "永不和豆浆",
    description: "供应早中晚",
    distance: "<100m"
  },
  {
    id: "rest7",
    img: require("../assets/img/bbqLogo.jpg"),
    name: "串门烧烤",
    description: "供应夜宵",
    distance: "<100m"
  },
  {
    id: "rest8",
    img: require("../assets/img/jiaoziLogo.jpg"),
    name: "隔壁水饺",
    description: "纯手工水饺",
    distance: "<100m"
  },
  {
    id: "rest9",
    img: require("../assets/img/riceLogo.jpg"),
    name: "张班长石锅饭",
    description: "班长喊你吃饭",
    distance: "<100m"
  },
  {
    id: "rest10",
    img: require("../assets/img/porridgeLogo.jpg"),
    name: "我的粥铺",
    description: "都是清汤寡水",
    distance: "<200m"
  },
  {
    id: "rest11",
    img: require("../assets/img/kaoyaLogo.jpg"),
    name: "北京烤鸭",
    description: "经典老牌",
    distance: "<200m"
  },
  {
    id: "rest12",
    img: require("../assets/img/fruitLogo.jpg"),
    name: "鲜果超市",
    description: "新鲜水果切、果汁、水果都有",
    distance: "<200m"
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

import FastFood from "@material-ui/icons/Fastfood";
import LibraryBooks from "@material-ui/icons/LibraryBooksOutlined";
import MerchantView from "./views/MerchantView/MerchantView";
import MerchantOrders from "./views/MerchantOrders/MerchantOrders";
import RestStat from "./views/RestaurantView/RestStat";
import BarChart from "@material-ui/icons/BarChart";

var merchantRoutes = [
  {
    path: "/merchant",
    name: "餐厅管理",
    rtlName: "餐厅管理",
    icon: FastFood,
    component: MerchantView,
    layout: "/merchant"
  },
  {
    path: "/orders",
    name: "订单管理",
    rtlName: "订单管理",
    icon: LibraryBooks,
    component: MerchantOrders,
    layout: "/merchant"
  },
  {
    path: "/statistics",
    name: "统计信息",
    icon: BarChart,
    component: RestStat,
    layout: "/merchant"
  }
];

export default merchantRoutes;
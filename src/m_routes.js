import FastFood from "@material-ui/icons/Fastfood";
import LibraryBooks from "@material-ui/icons/LibraryBooksOutlined";
import MerchantView from "./views/MerchantView/MerchantView";
import MerchantOrders from "./views/MerchantOrders/MerchantOrders";

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
  }
];

export default merchantRoutes;
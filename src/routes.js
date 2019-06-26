// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Done from "@material-ui/icons/Done";
import BarChart from "@material-ui/icons/BarChart";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import FastFood from "@material-ui/icons/Fastfood";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/Customer/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
import OrderList from "views/Customer/OrderList.jsx";
// import Typography from "views/Typography/Typography.jsx";
import OrderAct from "views/Customer/OrderAct";
import Restaurant from "./views/Customer/Rest";
import Statistics from "views/Customer/Statistics";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import MerchantView from "./views/MerchantView/MerchantView";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";

var dashboardRoutes = [
  {
    path: "/user",
    name: "用户信息",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/order",
    name: "订餐",
    icon: Done,
    component: OrderAct,
    layout: "/admin"
  },
  {
    path: "/list",
    name: "订单",
    icon: "content_paste",
    component: OrderList,
    layout: "/admin"
  },
  {
    path: "/restaurant",
    name: "餐厅详情",
    icon: LibraryBooks,
    component: Restaurant,
    layout: "/admin"
  },
  {
    path: "/statistics",
    name: "统计信息",
    icon: BarChart,
    component: Statistics,
    layout: "/admin"
  }
];

export default dashboardRoutes;

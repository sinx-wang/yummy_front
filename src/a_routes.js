import Dashboard from "@material-ui/icons/Dashboard";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Approve from "./views/ManagerView/Approve";
import Statistics from "./views/ManagerView/Statistics";

var adminRoutes = [
  {
    path: "/dashboard",
    name: "统计信息",
    rtlName: "统计信息",
    icon: Dashboard,
    component: Statistics,
    layout: "/manager"
  },
  {
    path: "/approve",
    name: "信息核准",
    rtlName: "信息核准",
    icon: PlaylistAddCheck,
    component: Approve,
    layout: "/manager"
  },
];

export default adminRoutes;
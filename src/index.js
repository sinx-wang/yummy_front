import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import Merchant from "layouts/Merchant.jsx";
import Manager from "layouts/Manager.jsx";

import "./assets/css/material-dashboard-react.css?v=1.6.0";
import LoginView from "./views/LoginView/LoginView";
import MerchanRegisterView from "./views/LoginView/MerchanRegisterView";
import MerchantLoginView from "./views/LoginView/MerchantLoginView";
import PayView from "./views/LoginView/PayView";
import AdminLoginView from "./views/LoginView/AdminLoginView";
import Restaurant from "./views/RestaurantView/Restaurant";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/admin/reataurant" component={Restaurant} />
      <Route path="/merchant" component={Merchant} />
      <Route path="/rtl" component={RTL} />
      <Route path="/manager" component={Manager} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/login/merchant" component={MerchantLoginView} />
      <Route path="/merchantRegister" component={MerchanRegisterView} />
      <Route path="/pay" component={PayView} />
      <Route exact path="/login/manager" component={AdminLoginView} />
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

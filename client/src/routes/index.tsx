import { RoutesTypeChildren } from "./types";
import { FaCalendarAlt, FaChartLine, FaCloudRain, FaCloudSun, FaHome, FaMusic, FaShoppingCart, FaSignInAlt, FaUserAlt } from "react-icons/fa"
import Dashboard from "pages/dashboards";
import AllMusic from "pages/music";
import Shop from "pages/shop";
import Login from "pages/login";
import CardSpotlight from "pages/card";
import Register from "pages/register";
import ForgotPassword from "pages/register/pages/forgotPassword";
import SmsCode from "pages/register/pages/smsCode";
import Users from "pages/users";
import Groups from "pages/users copy";
import Weather from "pages/weather";
import Chart from "pages/Chart";


export const public_routes: Array<RoutesTypeChildren> = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    config: {
      key: "unlock",
      icon: FaHome,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Users",
    path: "/users",
    component: Users,
    config: {
      key: "unlock",
      icon: FaUserAlt,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Groups",
    path: "/groups",
    component: Groups,
    config: {
      key: "unlock",
      icon: FaUserAlt,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Musics",
    path: "/music",
    component: AllMusic,
    config: {
      key: "unlock",
      icon: FaMusic,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Shop",
    path: "/shop",
    component: Shop,
    config: {
      key: "unlock",
      icon: FaShoppingCart,
      // icon: BsUiChecks,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    config: {
      key: "unlock",
      icon: FaSignInAlt,
      structure: "nonlayout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    config: {
      key: "unlock",
      icon: FaSignInAlt,
      structure: "nonlayout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Forgot password",
    path: "/forgot_password",
    component: ForgotPassword,
    config: {
      key: "unlock",
      icon: FaSignInAlt,
      structure: "nonlayout",
      exact: true,
      isMenu: false,
    },
    submenu: [],
  },
  {
    name: "SMS code",
    path: "/sms_code",
    component: SmsCode,
    config: {
      key: "unlock",
      icon: FaSignInAlt,
      structure: "nonlayout",
      exact: true,
      isMenu: false,
    },
    submenu: [],
  },
  {
    name: "Card",
    path: "/card",
    component: CardSpotlight,
    config: {
      key: "unlock",
      icon: FaSignInAlt,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Weather",
    path: "/weather",
    component: Weather,
    config: {
      key: "unlock",
      icon: FaCloudSun,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },
  {
    name: "Chart",
    path: "/chart",
    component: Chart,
    config: {
      key: "unlock",
      icon: FaChartLine,
      structure: "layout",
      exact: true,
      isMenu: true,
    },
    submenu: [],
  },

  // {
  //   name: "Not found",
  //   path: "/not_found",
  //   component: undefined,
  //   config: {
  //     key: "unlock",
  //     icon: FaFile,
  //     structure: "layout",
  //     exact: true,
  //     isShowLink: true,
  //   },
  //   submenu: [],
  // },
]

export const prived_routes: Array<RoutesTypeChildren> = [

]
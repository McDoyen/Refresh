import { createElement } from "react";

import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ForumIcon from "@material-ui/icons/ForumTwoTone";
import WeatherIcon from "@material-ui/icons/FilterDramaTwoTone";

import WeatherContainer from "../Weather/WeatherContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoginComponent from "../Authentication/Login/LoginComponent";
import { isLoggedIn } from "../Authentication/Utils";
import SettingsComponent from "./SettingsComponent";
import PrivateRoute from "../Authentication/Routes/PrivateRoute";

function DrawerComponent() {
  return createElement(
    Router,
    {},
    createElement(CssBaseline),
    createElement(
      Drawer,
      { variant: "permanent" },
      createElement(
        List,
        {},
        createElement(
          Link,
          { to: "/weather" },
          createElement(WeatherIcon, { fontSize: "large" })
        )
      ),
      createElement(
        Link,
        { to: isLoggedIn() ? "/chat" : "/login" },
        createElement(ForumIcon, { fontSize: "large" })
      ),
      createElement(SettingsComponent)
    ),
    createElement(
      Switch,
      {},
      createElement(
        Route,
        { exact: true, path: "/" },
        createElement(Redirect, { to: "/weather" })
      ),
      createElement(Route, { path: "/weather", component: WeatherContainer }),
      createElement(PrivateRoute, { component: ChatContainer, path: "/chat" }),
      createElement(Route, { path: "/login", component: LoginComponent })
    )
  );
}

export default DrawerComponent;

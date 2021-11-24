import { createElement } from "react";

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ForumIcon from "@material-ui/icons/ForumTwoTone";
import WeatherIcon from "@material-ui/icons/FilterDramaTwoTone";

import WeatherContainer from "../Weather/WeatherContainer";
import ChatContainer from "../Chat/ChatContainer";
import { isLoggedIn } from "../Authentication/Utils";
import SettingsComponent from "./SettingsComponent";
import PrivateRoute from "../Authentication/Routes/PrivateRoute";
import LoginContainer from "../Authentication/Login/LoginContainer";

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
      createElement(SettingsComponent) // TODO: Fix with state
    ),
    createElement(
      Routes,
      {},
      createElement(Route, {
        path: "/",
        element: createElement(WeatherContainer),
      }),
      createElement(Route, {
        path: "/weather",
        element: createElement(WeatherContainer),
      }),
      createElement(Route, {
        path: "/chat",
        element: createElement(PrivateRoute, {
          children: createElement(ChatContainer),
        }),
      }),
      createElement(Route, {
        path: "/login",
        element: createElement(LoginContainer),
      })
    )
  );
}

export default DrawerComponent;

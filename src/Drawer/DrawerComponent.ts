import { createElement, Fragment } from "react";

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
import { AppBar, Toolbar, Typography } from "@mui/material";
import ChatContainer from "../Chat/ChatContainer";

function DrawerComponent() {
  return createElement(
    Fragment,
    {},
    createElement(
      Router,
      {},
      createElement(CssBaseline),
      createElement(AppBar, {
        style: { position: "fixed" },
        sx: { width: `calc(100% - ${48}px)`, mr: `${48}px` },
      }),
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
          { to: "/chat" },
          createElement(ForumIcon, { fontSize: "large" })
        )
      ),
      createElement(
        Switch,
        {},
        createElement(
          Route,
          { exact: true, path: "/" },
          createElement(Redirect, { to: "/weather" })
        ),
        createElement(
          Route,
          { path: "/weather" },
          createElement(WeatherContainer)
        ),
        createElement(Route, { path: "/chat" }, createElement(ChatContainer))
      )
    )
  );
}

export default DrawerComponent;

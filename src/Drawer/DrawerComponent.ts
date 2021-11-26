import { createElement, useEffect, useState } from "react";

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ForumIcon from "@material-ui/icons/ForumTwoTone";
import WeatherIcon from "@material-ui/icons/FilterDramaTwoTone";

import WeatherContainer from "../Weather/WeatherContainer";
import ChatContainer from "../Chat/ChatContainer";
import SettingsComponent from "./SettingsComponent";
import PrivateRoute from "../Authentication/Routes/PrivateRoute";
import LoginContainer from "../Authentication/Login/LoginContainer";
import { loggedIn } from "../Authentication/Utils";

function DrawerComponent() {
  const [loggedin, setLoggedIn] = useState(false);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    if (loggedIn() || loggedin) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [loggedin, loggedIn()]);

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
        { to: loggedIn() || loggedin ? "/chat" : "/login" },
        createElement(ForumIcon, { fontSize: "large" })
      ),
      visibility ? createElement(SettingsComponent, { setLoggedIn }) : null
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
          loggedin,
          children: createElement(ChatContainer),
        }),
      }),
      createElement(Route, {
        path: "/login",
        element: createElement(LoginContainer, { setLoggedIn }),
      })
    )
  );
}

export default DrawerComponent;

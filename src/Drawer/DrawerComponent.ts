import { createElement } from "react";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ForumIcon from "@material-ui/icons/ForumTwoTone";
import WeatherIcon from "@material-ui/icons/FilterDramaTwoTone";

import WeatherContainer from "../Weather/WeatherContainer";

function DrawerComponent() {
  return createElement(
    Router,
    {},
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
      createElement(Route, { path: "/weather" }, createElement(Weather)),
      createElement(Route, { path: "/chat" })
    )
  );
}

function Weather() {
  return createElement(WeatherContainer);
}

export default DrawerComponent;

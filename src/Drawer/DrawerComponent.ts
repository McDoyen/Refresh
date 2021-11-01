import { createElement } from "react";

import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ForumIcon from "@material-ui/icons/ForumTwoTone";
import WeatherIcon from "@material-ui/icons/FilterDramaTwoTone";

import useStyles from "./styles";

function DrawerComponent() {
  const classes = useStyles();

  return createElement(
    Drawer,
    { variant: "permanent" },
    createElement(
      Link,
      {},
      createElement(List, {}, createElement(WeatherIcon, { fontSize: "large" }))
    ),
    createElement(
      Link,
      {},
      createElement(List, {}, createElement(ForumIcon, { fontSize: "large" }))
    )
  );
}

export default DrawerComponent;

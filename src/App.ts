import logo from "./logo.svg";
import "./App.css";

import { createElement, useEffect, useState } from "react";
import LocationIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator) {
      navigator.geolocation.watchPosition((position) => {
        setCurrentLocation(position.coords);
        console.log(position.coords);
      });
    } else {
      console.log("location access denied");
    }
  }, [currentLocation]);

  return createElement(
    "div",
    { className: "App" },
    createElement(
      "header",
      { className: "App-header" },
      createElement("p", {}, "Weather app"),
      createElement(LocationIcon, {}),
      createElement(
        Typography,
        {},
        `${currentLocation.longitude} ${currentLocation.latitude}`
      ),
      createElement("img", { className: "App-logo", src: logo }),
      createElement(
        "p",
        {},
        "Edit ",
        createElement("code", {}, "src/App.js"),
        " and save to reload."
      ),
      createElement(
        "a",
        {
          className: "App-link",
          href: "https://reactjs.org",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        "Learn React"
      )
    )
  );
}

export default App;

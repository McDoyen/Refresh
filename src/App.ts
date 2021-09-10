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
      navigator.geolocation.watchPosition((position) =>
        setCurrentLocation(position.coords)
      );
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
      createElement(
        "div",
        {className: "Location"},
        createElement(LocationIcon, {}),
        createElement(Typography, {}, weatherDiscription)
      ),
      createElement("img", {
        src: `http://openweathermap.org/img/w/${weatherIcon}.png`,
      })
    )
  );
}

export default App;

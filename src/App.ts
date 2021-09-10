import { createElement, useEffect, useState } from "react";
import LocationIcon from "@material-ui/icons/MyLocation";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import "./App.css";

function App() {
  const [{ city, country }, setState] = useState({ city: "", country: "" });
  const [{ temperature, weatherDiscription, weatherIcon }, setData] = useState({
    temperature: 0,
    weatherDiscription: "",
    weatherIcon: "",
  });

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
  const getLocation = "http://ip-api.com/json/";

  useEffect(() => {
    axios.get(getLocation).then(({ data }) => {
      setState({ city: data.city, country: data.country });
    });
    axios.get(apiURL).then(({ data }) => {
      setData({
        temperature: data.main.temp,
        weatherDiscription: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
      });
    });
  }, [city, temperature]);

  return createElement(
    "div",
    { className: "App" },
    createElement(
      "header",
      { className: "App-header" },
      createElement("p", {}, "Weather app"),
      createElement(
        "div",
        { className: "Location" },
        createElement(LocationIcon, {}),
        createElement(Typography, {}, `${city}, ${country}`),
        createElement(Typography, {}, temperature),
        createElement(Typography, {}, weatherDiscription)
      ),
      createElement("img", {
        src: `http://openweathermap.org/img/w/${weatherIcon}.png`,
      })
    )
  );
}

export default App;

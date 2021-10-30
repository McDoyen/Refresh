import { createElement, useEffect, useState } from "react";

import LocationIcon from "@material-ui/icons/MyLocation";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import useStyles from "./styles";
import MapComponent from "./MapComponent";
import { weatherImages } from "./Constants";

function App() {
  const classes = useStyles();
  const [{ city, country, longitude, latitude }, setState] = useState({
    city: "",
    country: "",
    longitude: 0,
    latitude: 0,
  });
  const [{ feelsLike, temperature, weatherDiscription, weatherIcon }, setData] =
    useState({
      feelsLike: 0,
      temperature: 0,
      weatherDiscription: "",
      weatherIcon: "",
    });
  const apiKey = process.env.REACT_APP_API_KEY;

  const openWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
  const getLocation = "http://ip-api.com/json/";

  let time = new Date();

  useEffect(() => {
    axios.get(getLocation).then(({ data }) => {
      setState({
        city: data.city,
        country: data.country,
        longitude: data.lon,
        latitude: data.lat,
      });
    });
    axios.get(openWeatherApiURL).then(({ data }) => {
      setData({
        feelsLike: data.main.feels_like,
        temperature: data.main.temp,
        weatherDiscription: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
      });
    });
  }, [openWeatherApiURL]);

  return createElement(
    "div",
    { className: classes.root },
    createElement(
      Grid,
      { className: classes.locationGrid, item: true, xs: 12 },
      createElement(LocationIcon, { className: classes.locationIcon }),
      createElement(Typography, {}, `${city}, ${country}`)
    ),
    createElement(
      Grid,
      {
        className: classes.weatherContainer,
        container: true,
        direction: "row",
      },
      createElement(
        Grid,
        {
          className: classes.tempGrid,
          container: true,
        },
        createElement(
          Grid,
          { className: classes.main, item: true, xs: 6, sm: 3 },
          createElement(
            Typography,
            { noWrap: true, variant: "subtitle1" },
            "CURRENT WEATHER"
          ),
          createElement(
            Typography,
            { variant: "body2" },
            time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          ),
          createElement(
            Grid,
            { container: true, direction: "row" },
            createElement("img", {
              src: `http://openweathermap.org/img/w/${weatherIcon}.png`,
            }),
            createElement(
              Typography,
              { className: classes.temp },
              `${temperature}°`
            )
          )
        ),
        createElement(
          Grid,
          { className: classes.description, item: true, xs: 6, sm: 3 },
          createElement(
            Typography,
            { variant: "subtitle1" },
            weatherDiscription
          ),
          createElement(
            Typography,
            { variant: "body2" },
            `Feels like ${feelsLike}°`
          )
        )
        )
      )
          ),
          latitude && longitude
            ? createElement(MapComponent, { latitude, longitude }) // TODO: Fix this
            : null
    )
  );
}

export default App;

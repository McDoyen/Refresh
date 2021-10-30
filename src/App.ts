import { createElement, useEffect, useState } from "react";
import { usePosition } from "use-position";

import LocationIcon from "@material-ui/icons/MyLocation";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import useStyles from "./styles";
import SkeletonComponent from "./SkeletonComponent";
import MapComponent from "./MapComponent";
import { weatherImages } from "./Constants";

function App() {
  const classes = useStyles();
  const { latitude, longitude } = usePosition(true);
  const [
    {
      city,
      country,
      feelsLike,
      loading,
      temperature,
      weatherDiscription,
      weatherIcon,
    },
    setData,
  ] = useState({
    loading: true,
    city: "",
    country: "",
    feelsLike: 0,
    temperature: 0,
    weatherDiscription: "",
    weatherIcon: "",
  });
  const apiKey = process.env.REACT_APP_API_KEY;

  const openWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;

  let time = new Date();

  useEffect(() => {
    axios.get(openWeatherApiURL).then(({ data }) => {
      setData({
        city: data.name,
        country: data.sys.country,
        feelsLike: data.main.feels_like,
        loading: false,
        temperature: data.main.temp,
        weatherDiscription: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
      });
    });
  }, [openWeatherApiURL, latitude, longitude]);

  return loading
    ? createElement(SkeletonComponent)
    : createElement(
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
              // backgroundImage: weatherIcon === 01d //TODO: use if
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
                time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              ),
              createElement(
                Grid,
                { container: true, direction: "row" },
                createElement("img", {
                  src: `http://openweathermap.org/img/w/${weatherIcon}.png`,
                }),
                createElement(
                  Typography,
                  { className: classes.temp, variant: "h3" },
                  `${temperature}°`
                ),
                createElement(
                  "div",
                  { className: classes.description },
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

import { createElement, useEffect, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LocationIcon from "@material-ui/icons/MyLocation";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import "./App.css";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currentGrid: { paddingLeft: "25%" },
    grid: {
      textAlign: "left",
      width: "50%",
    },
    root: {
      margin: "60px 60px 60px 60px",
    },
    tempGrid: {
      display: "contents",
    },
  })
);

function App() {
  const [{ city, country }, setState] = useState({ city: "", country: "" });
  const [{ feelsLike, temperature, weatherDiscription, weatherIcon }, setData] =
    useState({
      feelsLike: 0,
      temperature: 0,
      weatherDiscription: "",
      weatherIcon: "",
    });

  const classes = useStyles();
  const apiKey = process.env.REACT_APP_API_KEY;

  const openWeatherApiURL = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
  );
  const openWeatherMapApiURL = axios.get(
    `https://tile.openweathermap.org/map/temp_new/5/5/5.png?appid=${apiKey}`
  );
  const getLocation = "http://ip-api.com/json/";

  let time = new Date();
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    axios.get(getLocation).then(({ data }) => {
      setState({ city: data.city, country: data.country });
    });
    axios.all([openWeatherMapApiURL, openWeatherApiURL]).then(
      axios.spread((...responses) => {
        setData({
          feelsLike: responses[1].data.main.feels_like,
          temperature: responses[1].data.main.temp,
          weatherDiscription: responses[1].data.weather[0].description,
          weatherIcon: responses[1].data.weather[0].icon,
        });
      })
    );
  }, [city, temperature]);

  return createElement(
    "div",
    { className: classes.root },
    createElement(
      Grid,
      { container: true },
      createElement(
        Grid,
        { item: true, xs: 12 },
        createElement(LocationIcon, {}),
        createElement(Typography, {}, `${city}, ${country}`)
      ),
      createElement(
        Grid,
        { className: classes.tempGrid, item: true, xs: 12, sm: 6 },
        createElement(
          Grid,
          { item: true, xs: 6, sm: 3 },
          createElement(Typography, {}, "CURRENT WEATHER"),
          createElement(Typography, {}, time.toLocaleTimeString()),
          createElement("img", {
            src: `http://openweathermap.org/img/w/${weatherIcon}.png`,
          }),
          createElement(Typography, {}, `${temperature}°`)
        ),
        createElement(
          Grid,
          { item: true, xs: 6, sm: 3 },
          createElement(Typography, {}, weatherDiscription),
          createElement(Typography, {}, `Feels like ${feelsLike}°`)
        )
      ),
      createElement(
        Grid,
        { item: true, xs: 12, sm: 6 },
        createElement(
          MapContainer,
          {
            center: [51.505, -0.09],
            zoom: 13,
            scrollWheelZoom: false
          },
          createElement(TileLayer, {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }),
          createElement(Marker, { position: [51.505, -0.09] })
        )
      )
    )
  );
}

export default App;

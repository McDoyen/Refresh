import { createElement, useEffect, useState } from "react";
import { usePosition } from "use-position";
import axios from "axios";
import WeatherComponent from "./WeatherComponent";
import { weatherImages } from "../Constants";
import SkeletonComponent from "./SkeletonComponent";

function WeatherContainer() {
  const { latitude, longitude } = usePosition(true);
  let time = new Date();
  const apiKey = process.env.REACT_APP_API_KEY;
  const openWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;
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

  const weather_image =
    weatherIcon === "04n"
      ? weatherImages.brokenClouds
      : weatherIcon === "01n"
      ? weatherImages.clearSky
      : weatherIcon === "01n"
      ? weatherImages.clearSkySunset //TODO: fix this
      : weatherIcon === "02n"
      ? weatherImages.fewClouds
      : weatherIcon === "50n"
      ? weatherImages.mist
      : weatherIcon === "10n"
      ? weatherImages.rain
      : weatherIcon === "03n" || weatherIcon === "10d"
      ? weatherImages.scatteredClouds
      : weatherIcon === "09n"
      ? weatherImages.showerRain
      : weatherIcon === "13n"
      ? weatherImages.snow
      : weatherImages.thunderStorm;

  useEffect(() => {
    function waitForCordinates() {
      if (!!latitude) {
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
      }
    }
    setTimeout(waitForCordinates, 250);
  }, [openWeatherApiURL, latitude, longitude]);

  return !!loading
    ? createElement(SkeletonComponent)
    : createElement(WeatherComponent, {
        city,
        country,
        feelsLike,
        loading,
        latitude,
        longitude,
        time,
        temperature,
        weatherDiscription,
        weatherIcon,
        weather_image,
      });
}

export default WeatherContainer;

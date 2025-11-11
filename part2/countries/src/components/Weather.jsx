import { useEffect, useState } from "react";
import axios from "axios";

export const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    axios.get(url).then((response) => setWeather(response.data));
  });

  if (!weather) {
    return null;
  }

  const weatherIcon = weather.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img
        src={weatherIconUrl}
        alt={`Weather icon of ${weather.weather[0].description}`}
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  );
};

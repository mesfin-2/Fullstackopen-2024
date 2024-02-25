import axios from "axios";

const COUNTRIES_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const WEATHER_DATA_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getCountries = () => {
  const request = axios.get(COUNTRIES_URL);
  return request.then((returnedCountries) => returnedCountries.data);
};
const getWeather = (city) => {
  const request = axios.get(
    `${WEATHER_DATA_URL}${city}&units=metric&appid=${api_key}`
  );
  return request.then((returnedWeather) => returnedWeather.data);
};

export default { getCountries, getWeather };

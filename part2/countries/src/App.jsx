import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [flags, setFlags] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("countries does'n fetched");
      });
  }, []);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
        )

        .then((response) => {
          setWeatherData(response.data);
          console.log("weather", response.data);
        })
        .catch((error) => {
          console.log("something went wrong");
        });
    }
  }, [city]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredCountries.length <= 10) {
      setSearchResults(filteredCountries);
    } else {
      setSearchResults([]);
    }
    if (filteredCountries.length === 1) {
      let langs = Object.values(filteredCountries[0].languages);
      setLanguages(langs);
      //console.log("langs", langs);
      let flags = Object.values(filteredCountries[0].flags);
      console.log("flags", flags[0]);
      setFlags(flags);
      setSelectedCountry(filteredCountries[0]);
      setCity(filteredCountries[0].capital);
    } else {
      setSelectedCountry(null);
    }
  };

  return (
    <div>
      <h2>Countries</h2>
      <label htmlFor="search">Find countries:</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search countries..."
      />
      <ul>
        {searchResults.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
      {searchCount >= 10 && <p>Too many matches, specify another filter</p>}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <h4>Capital: {selectedCountry.capital}</h4>
          <h4>Area: {selectedCountry.area} sq km</h4>
          <h3>Languages:</h3>
          {languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
          {flags.length > 0 && <img src={flags[0]} alt="Country Flag" />}
          <h3>Weather in {selectedCountry.capital}</h3>
          {weatherData && weatherData.main && (
            <div>
              <h4>Temperature: {weatherData.main.feels_like} Celcius</h4>
              {weatherData.weather && weatherData.weather.length > 0 && (
                <div>
                  <h4>Description: {weatherData.weather[0].description}</h4>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  />
                  <h4>wind: {weatherData.wind.speed} m/s</h4>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

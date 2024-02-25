import React, { useState, useEffect } from "react";
import axios from "axios";
import ListCountries from "./components/ListCountries";
import Country from "./components/Country";
import Search from "./components/Search";
import countryServices from "./services/countries.js";

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
  const { errorMessage, setErrorMessage } = useState(null);

  useEffect(() => {
    countryServices
      .getCountries()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        setErrorMessage("Something went wrong");
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
      });
  }, []);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  useEffect(() => {
    if (city) {
      countryServices
        .getWeather(city)
        .then((response) => {
          setWeatherData(response);
          console.log("weather", response);
        })
        .catch((error) => {
          setErrorMessage("Something went wrong");
          setTimeout(() => {
            setErrorMessage(null);
          }, 1000);
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
      {errorMessage && <Notification errorMessage={errorMessage} />}
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <ListCountries searchResults={searchResults} searchCount={searchCount} />
      <Country
        selectedCountry={selectedCountry}
        weatherData={weatherData}
        languages={languages}
        flags={flags}
      />
    </div>
  );
}

export default App;

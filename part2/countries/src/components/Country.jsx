import React from "react";

const Country = ({ selectedCountry, weatherData, languages, flags }) => {
  return (
    <div>
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
};

export default Country;

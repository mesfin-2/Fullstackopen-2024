import React from "react";

const ListCountries = ({ searchResults, searchCount }) => {
  return (
    <div>
      <ul>
        {searchResults.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
      {searchCount >= 10 && <p>Too many matches, specify another filter</p>}
    </div>
  );
};

export default ListCountries;

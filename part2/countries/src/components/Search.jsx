import React from "react";

const Search = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <label htmlFor="search">Find countries:</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search countries..."
      />
    </div>
  );
};

export default Search;

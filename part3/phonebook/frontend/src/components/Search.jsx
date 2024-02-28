import React from "react";

const Search = ({ searchTerm, onSearch }) => {
  return (
    <div>
      <h3>Search contact by Name</h3>
      <input value={searchTerm} onChange={onSearch} />
    </div>
  );
};

export default Search;

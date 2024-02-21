import React from "react";
import Contact from "./Contact";

const ListOfContacts = ({ searchResult }) => {
  return (
    <div>
      <h3>Numbers</h3>
      {searchResult.map((person) => (
        <Contact person={person} />
      ))}
    </div>
  );
};

export default ListOfContacts;

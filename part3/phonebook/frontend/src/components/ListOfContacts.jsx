import React from "react";
import Contact from "./Contact";

const ListOfContacts = ({ searchResult, onDelete }) => {
  return (
    <div>
      <h3>Numbers</h3>
      {searchResult.map((person) => (
        <Contact key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ListOfContacts;

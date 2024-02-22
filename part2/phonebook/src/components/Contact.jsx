import React from "react";

const Contact = ({ person, onDelete }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} : {person.number}{" "}
        <button onClick={() => onDelete(person.id)}>delete</button>
      </p>
    </div>
  );
};

export default Contact;

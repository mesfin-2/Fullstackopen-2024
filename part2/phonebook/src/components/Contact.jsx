import React from "react";

const Contact = ({ person }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} : {person.number}
      </p>
    </div>
  );
};

export default Contact;

import React from "react";

const Note = ({ note }) => {
  return (
    <ul>
      <li>{note.content}</li>
    </ul>
  );
};

export default Note;

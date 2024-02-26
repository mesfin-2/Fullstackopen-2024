import React from "react";

const Note = ({ note, toggleImportance, handleDeleteNote }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <ul>
      <li className="note">
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
        <button onClick={handleDeleteNote}>delete</button>
      </li>
    </ul>
  );
};

export default Note;

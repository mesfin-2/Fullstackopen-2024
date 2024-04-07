import React from "react";
import Note from "./Note";

const NotesList = ({ onToggleShow, showAll, notesToShow }) => {
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={onToggleShow}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {/* {Array.isArray({ notesToShow }) && // Check if notesToShow is an array */}
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            handleDeleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;

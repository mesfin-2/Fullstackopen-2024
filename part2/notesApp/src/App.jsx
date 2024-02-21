import React, { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (e) => {
    e.preventDefault();

    //add new note
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, //50% chance being important
      id: notes.length + 1,
    };
    //setNotes(notes.concat(noteObject))
    setNotes({ ...notes, noteObject });
    setNotes("");
    console.log(newNote);
  };
  const onNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const onToggleShow = () => {
    setShowAll(!showAll);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={onToggleShow}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={onNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

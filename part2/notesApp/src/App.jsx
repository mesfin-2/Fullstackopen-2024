import React, { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");

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
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes && notes.map((note) => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={onNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

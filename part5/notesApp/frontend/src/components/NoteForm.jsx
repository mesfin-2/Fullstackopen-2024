import React from "react";

const NoteForm = ({ newNote, onNoteChange, addNote }) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={onNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;

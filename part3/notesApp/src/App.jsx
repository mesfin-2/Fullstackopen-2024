import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log("promise fulfilled");

      setNotes(initialNotes);
    });
  }, []);
  //console.log("render", notes.length, "notes");

  const addNote = (e) => {
    e.preventDefault();

    //add new note
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, //50% chance being important
      id: uuidv4(),
    };
    noteService.create(noteObject).then((returnedNote) => {
      //setNotes(notes.concat(returnedNote));
      setNotes([...notes, returnedNote]);
      setSuccessMessage("note created successfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);

      setNewNote("");
      console.log(newNote);
    });
  };
  const onNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const onToggleShow = () => {
    setShowAll(!showAll);
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) {
      setErrorMessage("This note has already been deleted.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return;
    }

    const isConfirmed = window.confirm(`Delete note ?`);
    if (isConfirmed) {
      noteService
        .deleteNote(noteToDelete.id)
        .then((returndNote) => {
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
          setSuccessMessage("Note Deleted Successfully");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${noteToDelete.content} has already been deleted from the server.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    }
  };

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    //create a new object that is an exact copy of the old note,
    //apart from the important property that has the value flipped (from true to false or from false to true).

    const changeNote = { ...note, important: !note.important };
    //he new note is then sent with a PUT request to the backend
    //After the request is successful, it updates the notes state by mapping over
    //the existing notes array. If the id of the note matches the id provided,
    //it replaces that note with the updated note received from the server (response.data).

    noteService
      .update(id, changeNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);

        //deleted note gets filtered out from the state.
        setNotes(notes.filter((n) => n.id !== id));
      });

    console.log(`importance of   ${id}  needs to be toggled`);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      {errorMessage && <Notification errormessage={errorMessage} />}
      {successMessage && <Notification successmessage={successMessage} />}

      <button onClick={onToggleShow}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {Array.isArray(notesToShow) && // Check if notesToShow is an array
          notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              handleDeleteNote={() => deleteNote(note.id)}
            />
          ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={onNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

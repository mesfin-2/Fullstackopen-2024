import React, { useState, useEffect, useRef } from "react";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";
import loginService from "./services/login.js";
import LoginForm from "./components/LoginForm.jsx";
import NoteForm from "./components/NoteForm.jsx";
import LogOut from "./components/LogOut.jsx";
import NotesList from "./components/NotesList.jsx";
import Togglable from "./components/Togglable.jsx";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /*
  The useRef hook is used to create a noteFormRef reference, that is assigned to the 
  Togglable component containing the creation note form. The noteFormRef variable acts as a reference to the component.
   This hook ensures the same reference (ref) that is kept throughout re-renders of the component  
  */

  const noteFormRef = useRef();

  //const navigate = useNavigate();
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log("promise fulfilled", initialNotes);

      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    // If logged-in user can already be found on the local storage. there details are saved to the state of the application and to noteService.
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    //add new note
    noteFormRef.current.toggleVisibility(); //This will make the note form input disapear after a new note added

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      //setNotes([...notes, returnedNote]);
      setSuccessMessage("note created successfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    });
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
      try {
        noteService.deleteNote(noteToDelete.id);

        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        setSuccessMessage("Note Deleted Successfully");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 1000);
      } catch (error) {
        setErrorMessage(
          `Information of ${noteToDelete.content} has already been deleted from the server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
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
  //const hideWhenVisible = { display: loginVisible ? "none" : "" };
  //const showWhenVisible = { display: loginVisible ? "" : "none" };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("name", user.username);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setSuccessMessage("Successfully LoggedIn");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  return (
    <div>
      {errorMessage && <Notification errormessage={errorMessage} />}
      {successMessage && <Notification successmessage={successMessage} />}

      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>Welocome - {user.username} </p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <LogOut handleLogOut={handleLogOut} />
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <NotesList
        onToggleShow={onToggleShow}
        showAll={showAll}
        notesToShow={notesToShow}
        deleteNote={deleteNote}
        toggleImportanceOf={toggleImportanceOf}
      />
      <Footer />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNewContact from "./components/AddNewContact";
import ListOfContacts from "./components/ListOfContacts";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import personService from "./services/person.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialState) => {
      setPersons(initialState);
    });
  }, []);

  useEffect(() => {
    const search = persons.filter((person) =>
      person.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(search);
  }, [persons, searchTerm]);

  const addContact = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };
    //make post request to json-server
    personService
      .create(nameObject)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setSuccessMessage(`${returnedPerson.name} Added Successfully`);
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 1000);
      })
      .catch((error) => {
        setErrorMessage("account not added");
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
      });

    //check if the contact is already in there
    const existedContact = persons.find(
      (person) => person.name?.toLowerCase() === newName.toLowerCase()
    );
    if (existedContact) {
      const isConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (isConfirmed) {
        // Update the number of the existing contact

        const updateConact = { ...existedContact, number: newNumber };
        personService
          .update(existedContact.id, updateConact)
          .then((returnedPerson) => {
            // Update the state with the updated contact
            const updatedPersons = persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            );
            setPersons(updatedPersons);
            setSuccessMessage(`${returnedPerson.name} Updated Successfully`);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setSuccessMessage(null);
            }, 1000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information ${existedContact.name} already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 1000);
          });
      }
    }
  };
  const onNameChange = (e) => {
    setNewName(e.target.value);
  };
  const onNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const onsearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const deleteContact = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!personToDelete) {
      setErrorMessage("This contact has already been deleted.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
    }

    const isConfirmed = window.confirm(`Delete ${personToDelete.name} ?`);
    if (isConfirmed) {
      personService
        .deletePerson(personToDelete.id)
        .then((returndPerson) => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          setSuccessMessage(`${personToDelete.name} Deleted Successfully`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${personToDelete.name} has already been deleted from the server.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 1000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Search searchTerm={searchTerm} onSearch={onsearchTermChange} />
      <AddNewContact
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
        addContact={addContact}
      />
      <ListOfContacts searchResult={searchResult} onDelete={deleteContact} />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNewContact from "./components/AddNewContact";
import ListOfContacts from "./components/ListOfContacts";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import personService from "./services/person.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    personService.create(nameObject).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
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
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating contact:", error);
          });
      }
    } else {
      // Prompt the user to confirm adding the new contact
      const isConfirmed = window.confirm(`Add ${newName} to the phonebook?`);

      if (isConfirmed) {
        // Add the new contact
        personService
          .create(nameObject)
          .then((returnedPerson) => {
            // Update the state with the new contact
            setPersons([...persons, returnedPerson]);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error adding contact:", error);
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
    if (!personToDelete) return;

    const isConfirmed = window.confirm(`Delete ${personToDelete.name} ?`);
    if (isConfirmed) {
      const updatedContacts = persons.filter((person) => person.id !== id);

      setPersons(updatedContacts);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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

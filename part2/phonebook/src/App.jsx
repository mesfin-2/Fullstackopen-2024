import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNewContact from "./components/AddNewContact";
import ListOfContacts from "./components/ListOfContacts";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    const search = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    axios.post("http://localhost:3001/persons", nameObject).then((response) => {
      setNewName([...persons, response.data]);
      setNewName("");
      setNewNumber("");
    });

    //check if the contact is already in there
    const existedContact = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (existedContact) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons([...persons, nameObject]);
      //setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
      console.log(persons);
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
      <ListOfContacts searchResult={searchResult} />
    </div>
  );
};

export default App;

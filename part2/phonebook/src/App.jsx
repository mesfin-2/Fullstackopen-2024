import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNewContact from "./components/AddNewContact";
import ListOfContacts from "./components/ListOfContacts";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    };
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

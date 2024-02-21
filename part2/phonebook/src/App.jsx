import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "044-0656722" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addContact = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    //check if the contact is already in there
    const existedContact = persons.find((person) => person.name === newName);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons?.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;

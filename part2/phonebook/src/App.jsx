import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addContact = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
    };
    //check if the contact is already in there
    const existedContact = persons.find((person) => person.name === newName);
    if (existedContact) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      setPersons([...persons, nameObject]);
      //setPersons(persons.concat(nameObject));
      setNewName("");
      console.log(persons);
    }
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons?.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;

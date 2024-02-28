import React from "react";

const AddNewContact = ({
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
  addContact,
}) => {
  return (
    <div>
      <h3>Add new contact</h3>
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
    </div>
  );
};

export default AddNewContact;

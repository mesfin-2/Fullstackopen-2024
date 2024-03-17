const Note = require("../models/note");
const User = require("../models/user");

//Let's initialize the database before every test with the beforeEach function:

const initialNotes = [
  {
    content: "HTML is easy",
    important: true,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];
//function ahead of time, which can be used for creating a database object ID
// that does not belong to any note object in the database.
const nonExistingId = async () => {
  const note = new Note({ content: "willremovesoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};
//function that can be used for checking the notes stored in the database.
const notesInDb = async () => {
  const notes = await Note.find({});

  return notes.map((note) => note.toJSON());
};
//function that can be used for checking the users stored in the database.
const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};

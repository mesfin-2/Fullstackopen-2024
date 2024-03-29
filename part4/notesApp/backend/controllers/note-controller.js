const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Note = require("../models/note-model");
const User = require("../models/user-model");
const getTokenFrom = require("../utils/getToken");

const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  console.log("notes from API", notes);
  res.json(notes);
};

const getAnote = async (req, res) => {
  const { id } = req.params;

  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const note = await Note.findById(id);

  //res.json(note);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "note not found" }).end();
  }
};

/*
 we do not need the next(exception) call anymore.
  The Express_async_Error handles everything under the hood. 
 If an exception occurs in an async route, the execution 
 is automatically passed to the error-handling middleware.
*/

const deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.status(204).json({ message: "note deleted Successfully" }).end();
};

const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { content, important } = req.body;

  const note = {
    content: content,
    important: important,
  };

  const updatedNote = await Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });
  res.status(200).json(updatedNote);
};

const createNote = async (request, response) => {
  const body = request.body;
  //The validity of the token is checked with jwt.verify.
  //The method also decodes the token, or returns the Object which the token was based on.
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  console.log("decodedToken", decodedToken);
  /*    
    If the object decoded from the token does not contain the user's identity (decodedToken.id is undefined), error status
   code 401 unauthorized is returned and the reason for the failure is explained in the response body.
    */

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  // Extract user ID from token payload
  const userId = body.userId;

  //Retrieve user from db
  if (!userId) {
    return response.status(400).json({ error: "userId missing in request" });
  }
  //const user = await User.findById(body.userId);
  //The object decoded from the token contains the username and id fields, which tell the server who made the request.
  const user = await User.findById(userId);
  //console.log("user", user);
  // Check if user exists
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  if (!body.content || undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  //the user who created a note is sent in the userId field of the request body:
  const { content, important, username } = request.body;

  const note = new Note({
    content: content,
    important: Boolean(important) || false,
    user: userId,
    username: username,
  });

  const savedNote = await note.save();

  // Add note to user's notes list
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  console.log("userNotes", user.notes);
  response.status(201).json(savedNote);
};

module.exports = {
  getAllNotes,
  getAnote,
  deleteNote,
  updateNote,
  createNote,
};

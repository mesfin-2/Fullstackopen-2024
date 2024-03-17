const notesRouter = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  console.log("notes from API", notes);
  res.json(notes);
});

notesRouter.get("/:id", async (req, res) => {
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
    res.status(404).end();
  }
});

/*
 we do not need the next(exception) call anymore.
  The library handles everything under the hood. 
 If an exception occurs in an async route, the execution 
 is automatically passed to the error-handling middleware.
*/
notesRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.status(204).end();
});

notesRouter.put("/:id", async (req, res, next) => {
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
  })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

/*
 we do not need the next(exception) call anymore.
  The library handles everything under the hood. 
 If an exception occurs in an async route, the execution 
 is automatically passed to the error-handling middleware.
*/
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.userId);
  console.log("user", user);

  if (!body.content || undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  //the user who created a note is sent in the userId field of the request body:

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  console.log("userNotes", user.notes);
  response.status(201).json(savedNote);
});

module.exports = notesRouter;

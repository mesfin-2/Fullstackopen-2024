const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});
/*
Because of the library(express-async-errors), we do not need the next(exception) call anymore.
 The library handles everything under the hood. 
If an exception occurs in an async route, the execution is automatically
 passed to the error-handling middleware.

*/

notesRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findById(id);

  //res.json(note);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
/*
Because of the library(express-async-errors), we do not need the next(exception) call anymore.
 The library handles everything under the hood. 
If an exception occurs in an async route, the execution is automatically
 passed to the error-handling middleware.

*/

notesRouter.delete("/:id", async (req, res) => {
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
Because of the library(express-async-errors), we do not need the next(exception) call anymore.
 The library handles everything under the hood. 
If an exception occurs in an async route, the execution is automatically
 passed to the error-handling middleware.

*/
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.content || undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

module.exports = notesRouter;

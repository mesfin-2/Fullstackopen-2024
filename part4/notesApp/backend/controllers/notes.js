const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    //res.json(note);
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    Note.findByIdAndDelete(id);
    res.status(204).end();
  } catch (exception) {
    next(error);
  }
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

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;

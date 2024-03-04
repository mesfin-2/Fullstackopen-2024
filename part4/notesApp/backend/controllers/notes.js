const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      //res.json(note);
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { content, important } = req.body;

  const note = {
    content: content,
    important: important,
  };

  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
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

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;

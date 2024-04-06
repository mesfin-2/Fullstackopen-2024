const notesRouter = require("express").Router();
const notes = require("../controllers/note-controller");

notesRouter.get("/", notes.getAllNotes);
notesRouter.get("/:id", notes.getAnote);
notesRouter.delete("/:id", notes.deleteNote);
notesRouter.put("/:id", notes.updateNote);
notesRouter.post("/", notes.createNote);

module.exports = notesRouter;

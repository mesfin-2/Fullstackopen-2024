require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note.js");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const app = express();
app.use(express.json());
app.use(cors());
//To make express show static content, the page index.html and the JavaScript, etc., it fetches,
app.use(express.static("dist"));

//This middleware will be used for catching requests made to non-existent routes.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>");
});
app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});
app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  Note.findById(id).then((note) => {
    res.json(note);
  });
  // if (note) {
  //   res.status(200).json(note);
  // } else {
  //   res.status(404).end();
  // }
});
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
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

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

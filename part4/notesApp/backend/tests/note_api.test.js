const { test, after, beforeEach, only } = require("node:test");
const Note = require("../models/note");
const mongoose = require("mongoose");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");

//Let's initialize the database before every test with the beforeEach function:

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];
/**
 * What beforeEach does
 * The database is cleared out at the beginning, and after that,
 *  we save the two notes stored in the initialNotes array to the database.
 *
 */

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

//The tests only use the Express application defined in the app.js file, which does not listen to any ports:defined in index.js
const api = supertest(app); //superagent

test.only("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, 2);
});
test("there are two notes", async () => {
  const response = await api.get("/api/notes");
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable respons

  assert.strictEqual(response.body.length, initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  //assert => verify that the note is among the returned ones:
  assert(contents.includes("HTML is easy"));
});

/*
Once all the tests  have finished running we have to close the database connection
 used by Mongoose. This can be easily achieved with the after method:
*/
after(async () => {
  await mongoose.connection.close();
});

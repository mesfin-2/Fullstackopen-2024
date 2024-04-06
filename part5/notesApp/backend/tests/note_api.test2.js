const { test, after, beforeEach, describe } = require("node:test");
const Note = require("../models/note");
const mongoose = require("mongoose");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
//The tests only use the Express application defined in the app.js file, which does not listen to any ports:defined in index.js
const api = supertest(app); //superagent

/**
 * What beforeEach does
 * The database is cleared out at the beginning, and after that,
 *  we save the two notes stored in the initialNotes array to the database.
 *
 */

//The readability of the test would improve if we group related tests with describe blocks.
//Group 1
describe("when there is initially some notes saved", () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    //await Note.insertMany(helper.initialNotes)

    /*
    The noteObjects variable is assigned to an array of Mongoose objects that are 
    created with the Note constructor for each of the notes in the helper.initialNotes array.
    */

    const noteObjects = helper.initialNotes.map((note) => new Note(note));
    /*
     promiseArray=> creates a new array that consists of promises, that are created by calling the save method 
     of each item in the noteObjects array. In other words, it is an array of promises for saving 
     each of the items to the database.
    
    */
    const promiseArray = noteObjects.map((note) => note.save());
    /*
    The Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled
     once every promise in the array passed to it as a parameter is resolved
    - Promise.all(promiseArray) waits until every promise for saving a note is finished, meaning that the database 
    has been initialized.
    */
    await Promise.all(promiseArray);
  });
  // Test that notes are returned as JSON
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  // Test that all initial notes are returned
  test("all notes are returned ", async () => {
    const response = await api.get("/api/notes");
    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });
  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);
    assert(contents.includes("Browser can execute only JavaScript"));
  });
});

// test.only("notes are returned as json", async () => {
//   await api
//     .get("/api/notes")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });

// test.only("there are two notes", async () => {
//   const response = await api.get("/api/notes");

//   assert.strictEqual(response.body.length, 2);
// });

//Group 2

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(resultNote.body, noteToView);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  //update the route to make this test work //Check if id is a valid ObjectId

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});
describe("addition of a new note", () => {
  // Test adding a valid note
  test("succeeds with valid data", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    assert(contents.includes("async/await simplifies making async calls"));
  });

  // Test that a note without content is not added

  test("fails with status code 400 if data invalid", async () => {
    const newNote = {
      important: false,
    };
    await api.post("/api/notes").send(newNote).expect(400);
    //check the state stored in the database after the saving operation, by fetching all the notes of the application.
    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
  });
});

/*
// Additional test to ensure there are two notes

test("there are two notes", async () => {
  const response = await api.get("/api/notes");
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable respons

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});
// Additional test to verify the first note is about HTTP methods
test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((e) => e.content);
  //assert => verify that the note is among the returned ones:
  assert(contents.includes(helper.initialNotes[0].content));
});
// Additional test to view a specific note
test("a specific note can be viewed", async () => {
  const noteAtStart = await helper.notesInDb();
  const noteToView = noteAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(resultNote.body, noteToView);
});
*/

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);
    assert(!contents.includes(noteToDelete.content));
  });
});

/*
Once all the tests  have finished running we have to close the database connection
 used by Mongoose. This can be easily achieved with the after method:
*/
after(async () => {
  await mongoose.connection.close();
});

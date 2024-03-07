const { test, after } = require("node:test");
const mongoose = require("mongoose");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");

//The tests only use the Express application defined in the app.js file, which does not listen to any ports:defined in index.js
const api = supertest(app); //superagent object

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("there are nine notes", async () => {
  const response = await api.get("/api/notes");
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable respons
  assert.strictEqual(response.body.length, 9);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  //assert => verify that the note is among the returned ones:
  assert.strictEqual(contents.includes("HTML is easy"), true);
});

/*
Once all the tests  have finished running we have to close the database connection
 used by Mongoose. This can be easily achieved with the after method:
*/
after(async () => {
  await mongoose.connection.close();
});

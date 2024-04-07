const { test, after, beforeEach, describe } = require("node:test");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helpers");

//node --test-reporter spec "tests/blog_api.test2.js"
//The tests only use the Express application defined in the app.js file, which does not listen to any ports:defined in index.js
const api = supertest(app); //sup

describe("Create root user initially", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const userObjects = helper.initialUsers.map((user) => {
      const passwordHash = bcrypt.hash(user.password, 10);
      return new User({
        username: user.username,
        name: user.name,
        passwordHash,
      });
    });

    await Promise.all(userObjects.map((u) => u.save()));
  });
});

// test("creation succeeds with a fresh username", async () => {
//   const usersAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "mesfint",
//     name: "Mesfin T",
//     password: "password",
//   };

//   await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   const usersAtEnd = await helper.usersInDb();
//   assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

//   const usernames = usersAtEnd.map((u) => u.username);
//   assert(usernames.includes(newUser.username));
// });

//test that verifies that a new user with the same username can not be created:
// test("creation fails with proper statuscode and message if username already taken", async () => {
//   const usersAtStart = await helper.usersInDb();
//   //console.log("usersAtStart", usersAtStart);

//   const newUser = {
//     username: "root",
//     name: "Mesfin T",
//     password: "password",
//   };

//   const result = await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   //console.log("Actual error message:", result.body.error);

//   assert.strictEqual(result.body.error, "Username already taken");
// });
// test("creation username and password must be more than three characters", async () => {
//   const usersAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "me",
//     name: "Mesfin T",
//     password: "pa",
//   };

//   const response = await api.post("/api/users").send(newUser).expect(400);

//   assert(
//     response.body.error.includes(
//       "Password and username length too short, must be greater than 3"
//     )
//   );

//   //const usersAtEnd = await helper.usersInDb();
//   //expect(usersAtEnd.length).toBe(usersAtStart.length);
// });

describe("GET requests", () => {
  test("There is only one user", async () => {
    // Send a GET request to the /api/users endpoint
    const response = await api.get("/api/users").expect(200);

    // Assert that the response contains exactly one user
    assert.strictEqual(response.body.length, 1);

    // Assert that the username of the user in the response matches the expected username
    assert.strictEqual(response.body[0].username, "admin");
  });
});

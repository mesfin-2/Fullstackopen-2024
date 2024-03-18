const { test, after, beforeEach, describe } = require("node:test");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helpers");
//The tests only use the Express application defined in the app.js file, which does not listen to any ports:defined in index.js
const api = supertest(app); //sup

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mesfint",
      name: "Mesfin T",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  //test that verifies that a new user with the same username can not be created:
  test(
    "creation fails with proper statuscode and message if username already taken",
    { only: true },
    async () => {
      const usersAtStart = await helper.usersInDb();
      console.log("usersAtStart", usersAtStart);

      const newUser = {
        username: "root",
        name: "Mesfin T",
        password: "password",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      console.log("Actual error message:", result.body.error);

      assert.ok(result.body.error.includes("Username already taken"));
    }
  );
});

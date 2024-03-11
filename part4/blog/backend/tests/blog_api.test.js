const { test, after, beforeEach, only } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

//before Each

test("blogs are returned as json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//test("id of a blog should be _id from database");
//after Each test

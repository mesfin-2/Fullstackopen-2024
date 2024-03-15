const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

//before Each

test.only("There is only three blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 3);
});

test("blogs are returned as json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Each blog post have id property instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  console.log("id-Check", Object.hasOwn(blogs[0], "id"));

  blogs.forEach((blog) => {
    assert.strictEqual(Object.hasOwn(blogs[0], "id"), true);
    assert.strictEqual(Object.hasOwn(blogs[0], "_id"), false);
  });
});

//after Each test
after(async () => {
  await mongoose.connection.close();
});

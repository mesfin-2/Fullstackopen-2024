const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helpers = require("./test_helpers");
const api = supertest(app);

//before

beforeEach(async () => {
  await Blog.deleteMany({});
  /*
    The noteObjects variable is assigned to an array of Mongoose objects that are 
    created with the Note constructor for each of the notes in the helper.initialNotes array.
    */

  const blogObjects = helpers.initialBlogs.map((blog) => new Blog(blog));
  /*
     promiseArray=> creates a new array that consists of promises, that are created by calling the save method 
     of each item in the noteObjects array. In other words, it is an array of promises for saving 
     each of the items to the database.
    
    */
  const promiseArray = blogObjects.map((blog) => blog.save());
  /*
    The Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled
     once every promise in the array passed to it as a parameter is resolved
    - Promise.all(promiseArray) waits until every promise for saving a note is finished, meaning that the database 
    has been initialized.
    */
  await Promise.all(promiseArray);
});

test.only("There is only three blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helpers.initialBlogs.length);
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

// Test adding a valid blog post
test("add a valid blog post ", async () => {
  const newBlog = {
    title: "MERN-Stack app development",
    author: "Mesfin M",
    url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
    likes: 2,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  //check the state stored in the database after the saving operation, by fetching all the blogs of the application.
  const blogsAtEnd = await Blog.find({});

  assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length + 1);

  // Convert blog objects to JSON
  const blogObjects = blogsAtEnd.map((blog) => blog.toJSON());

  // Check if the new blog post's title is included in the saved blogs
  const contents = blogObjects.map((n) => n.title);
  assert(contents.includes(newBlog.title));
});

//after Each test
after(async () => {
  await mongoose.connection.close();
});

const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helpers = require("./test_helpers");
const User = require("../models/user");
const { log } = require("console");
const api = supertest(app);
const jwt = require("jsonwebtoken");

// Define a describe block for blog-related tests
describe("Blog API", () => {
  // Define a beforeEach hook to initialize the database
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helpers.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  // Define a describe block for GET requests
  describe("GET requests", () => {
    test("There is only three blog posts", async () => {
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
      //console.log("id-Check", Object.hasOwn(blogs[0], "id"));

      blogs.forEach((blog) => {
        assert.strictEqual(Object.hasOwn(blog, "id"), true);
        assert.strictEqual(Object.hasOwn(blog, "_id"), false);
      });
    });
  });

  // Define a describe block for POST requests
  describe("POST requests", () => {
    test("add a valid blog post ", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDgwZTdmOTFiNThhZTNkOWFmMGRkYSIsImlhdCI6MTcxMTk4OTQyNiwiZXhwIjoxNzEyMDc1ODI2fQ.UasQ-ytoMi4tnxKtm8DKOVZ5zCoh-r1EFZXZ5vBOd-4";
      const decodedToken = jwt.verify(token, process.env.SECRET);
      console.log("token-from-test", decodedToken.id);

      const newBlog = {
        title: "MERN-Stack app development",
        author: "Mesfin M",
        url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
        likes: 2,
        user: decodedToken.id,
      };
      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const blogsAtEnd1 = await helpers.blogsInDb();
      assert.strictEqual(blogsAtEnd1.length, helpers.initialBlogs.length + 1);
      const contents1 = blogsAtEnd1.map((n) => n.title);
      assert(contents1.includes(newBlog.title));

      //Test delete alone, otherwise its affecting other test specially the test for counting all blog posts
      //  DELETE requests

      // const blogsAtStart = await helpers.blogsInDb();
      // const blogToDelete = response.body;

      // await api
      //   .delete(`/api/blogs/${blogToDelete.id}`)
      //   .set("Authorization", `Bearer ${token}`)
      //   .expect(204);

      // const blogsAtEnd = await helpers.blogsInDb();

      // assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length - 1);

      // const contents = blogsAtEnd.map((r) => r.title);
      // assert(!contents.includes(blogToDelete.title));

      // PUT requests

      const blogsAtStart2 = await helpers.blogsInDb();
      const blogToUpdate = response.body;
      const updatedLikes = 4;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: updatedLikes })
        .expect(204);

      const blogsAtEnd2 = await helpers.blogsInDb();
      const contents2 = blogsAtEnd2.map((r) => r.title);

      const updatedBlog = blogsAtEnd2.find(
        (blog) => blog.id === blogToUpdate.id
      );
      //console.log("Updated blog:", updatedBlog);

      assert.strictEqual(updatedBlog.likes, updatedLikes);
    });
  });
  // test("assign a 0 value for missing likes from the request", async () => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDgwZTdmOTFiNThhZTNkOWFmMGRkYSIsImlhdCI6MTcxMTk4OTQyNiwiZXhwIjoxNzEyMDc1ODI2fQ.UasQ-ytoMi4tnxKtm8DKOVZ5zCoh-r1EFZXZ5vBOd-4";
  //   const decodedToken = jwt.verify(token, process.env.SECRET);

  //   const newBlog = {
  //     title: "FullStack app development2",
  //     author: "Mesfin M",
  //     url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
  //     user: decodedToken.id,
  //   };
  //   const response = await api
  //     .post("/api/blogs")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(newBlog)
  //     .expect(201);
  //   const { likes } = response.body;
  //   assert.strictEqual(likes, 0);
  //   const blogsAtEnd = await Blog.find({});
  //   assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length + 1);
  // });
  // test("No blog creation if title or url are missing from the request ", async () => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDgwZTdmOTFiNThhZTNkOWFmMGRkYSIsImlhdCI6MTcxMTk4OTQyNiwiZXhwIjoxNzEyMDc1ODI2fQ.UasQ-ytoMi4tnxKtm8DKOVZ5zCoh-r1EFZXZ5vBOd-4";
  //   const decodedToken = jwt.verify(token, process.env.SECRET);
  //   const newBlog = {
  //     author: "Mesfin M",
  //     likes: 2,
  //     user: decodedToken.id,
  //   };
  //   const response = await api
  //     .post("/api/blogs")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(newBlog)
  //     .expect(400);
  //   const blogsAtEnd1 = await helpers.blogsInDb();
  //   assert.strictEqual(blogsAtEnd1.length, helpers.initialBlogs.length);
});

// Define an after hook to close the database connection
after(async () => {
  await mongoose.connection.close();
});

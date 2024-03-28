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
      const users = await User.find({});
      //const randomUser = users[Math.floor(Math.random() * users.length)];
      const rootUser = users[0];
      console.log("rootUser", rootUser);

      const newBlog = {
        title: "MERN-Stack app development",
        author: "Mesfin M",
        url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
        user: rootUser._id,
      };
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const blogsAtEnd = await helpers.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length + 1);
      const contents = blogsAtEnd.map((n) => n.title);
      assert(contents.includes(newBlog.title));
    });
    // test("likes property is missing from the request", async () => {
    //   const newBlog = {
    //     title: "FullStack app development2",
    //     author: "Mesfin M",
    //     url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
    //   };
    //   const response = await api.post("/api/blogs").send(newBlog).expect(201);
    //   const { likes } = response.body;
    //   assert.strictEqual(likes, 0);
    //   const blogsAtEnd = await Blog.find({});
    //   assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length + 1);
    // });
    // test("title or url properties are missing from the request ", async () => {
    //   const newBlog = {
    //     author: "Mesfin M",
    //     likes: 2,
    //   };
    //   await api.post("/api/blogs").send(newBlog).expect(400);
    //   const blogsAtEnd = await helpers.blogsInDb();
    //   assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length);
    // });
  });

  // Define a describe block for DELETE requests
  // describe("DELETE requests", () => {
  //   test("delete single blog post", async () => {
  //     const blogsAtStart = await helpers.blogsInDb();
  //     //console.log("blogAtStart", blogsAtStart);
  //     const blogToDelete = blogsAtStart[0];
  //     //console.log("blogToDelete", blogToDelete);

  //     await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  //     const blogsAtEnd = await helpers.blogsInDb();

  //     assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length - 1);

  //     const contents = blogsAtEnd.map((r) => r.title);
  //     assert(!contents.includes(blogToDelete.title));
  //   });
  // });

  // Define a describe block for PUT requests
  // describe("PUT requests", () => {
  //   test("update a single blog likes", async () => {
  //     const blogsAtStart = await helpers.blogsInDb();
  //     const blogToUpdate = blogsAtStart[0];
  //     const updatedLikes = 4;

  //     await api
  //       .put(`/api/blogs/${blogToUpdate.id}`)
  //       .send({ likes: updatedLikes })
  //       .expect(204);

  //     const blogsAtEnd = await helpers.blogsInDb();

  //     const updatedBlog = blogsAtEnd.find(
  //       (blog) => blog.id === blogToUpdate.id
  //     );
  //     //console.log("Updated blog:", updatedBlog);

  //     assert.strictEqual(updatedBlog.likes, updatedLikes);
  //   });
  // });
});

// Define an after hook to close the database connection
after(async () => {
  await mongoose.connection.close();
});

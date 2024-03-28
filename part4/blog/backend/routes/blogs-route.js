const { req } = require("../app");
const Blog = require("../models/blog");
const blog = require("../controllers/blogs-controller.js");
const User = require("../models/user");
const logger = require("../utils/logger");

const blogRouter = require("express").Router();

blogRouter.get("/", blog.getAllBlogs);

blogRouter.delete("/:id", blog.deleteBlog);

blogRouter.post("/", blog.createBlog);

blogRouter.put("/:id", blog.updateBlog);

module.exports = blogRouter;

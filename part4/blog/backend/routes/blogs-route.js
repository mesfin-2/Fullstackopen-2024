const { req } = require("../app");
const Blog = require("../models/blog");
const blog = require("../controllers/blogs-controller.js");
const User = require("../models/user");
const logger = require("../utils/logger");

const blogRouter = require("express").Router();

blogRouter.delete("/:id", blog.deleteBlog);
blogRouter.get("/", blog.getAllBlogs);
blogRouter.post("/", blog.createBlog);
blogRouter.put("/:id", blog.updateBlog);

module.exports = blogRouter;

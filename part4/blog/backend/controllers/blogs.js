const Blog = require("../models/blog");
const logger = require("../utils/logger");

const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);

  // .catch((error) => {
  //   logger.error(`No Blog list found, ${error.message}`);
  // });
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();

  response.status(201).json(result);

  // .catch((error) => {
  //   logger.error(`Blog not created, ${error.message}`);
  // });
});

module.exports = blogRouter;

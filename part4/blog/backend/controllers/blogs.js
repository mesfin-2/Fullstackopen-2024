const Blog = require("../models/blog");
const logger = require("../utils/logger");

const blogRouter = require("express").Router();

blogRouter.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => {
      logger.error(`No Blog list found, ${error.message}`);
    });
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      logger.error(`Blog not created, ${error.message}`);
    });
});

module.exports = blogRouter;

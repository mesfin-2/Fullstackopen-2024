const { req } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

const blogRouter = require("express").Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  res.json(blogs);

  // .catch((error) => {
  //   logger.error(`No Blog list found, ${error.message}`);
  // });
});

blogRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

blogRouter.post("/", async (req, res) => {
  const { title, url, author, likes, userId } = req.body;

  if (!title || !url || !author) {
    return res
      .status(400)
      .json({ error: "Title  URL and Author are required" });
  }

  const user = await User.findById(userId);
  console.log("From Blog API-user", user);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0, //If likes is missing default is 0
    user: user.id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);

  // .catch((error) => {
  //   logger.error(`Blog not created, ${error.message}`);
  // });
});

blogRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  const blog = {
    likes: likes,
  };

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  res.status(204).json(updateBlog).end();
});

module.exports = blogRouter;

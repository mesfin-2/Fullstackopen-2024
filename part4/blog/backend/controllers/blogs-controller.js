const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  return res.json(blogs);

  // .catch((error) => {
  //   logger.error(`No Blog list found, ${error.message}`);
  // });
};

const createBlog = async (request, response) => {
  const { title, url, author, likes = 0 } = request.body;

  //console.log("id from body request", userId);
  //Extract token from the request
  const token = request.token;
  console.log("Token", token);

  // Check if token is present
  if (!token) {
    return response.status(401).json({ error: "Token must be provided" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log("id from decoded token", decodedToken.id);

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "Token invalid" });
  // }

  // Get  user from the database to assign as the creator of the blog
  const user = await User.findById(decodedToken.id);
  console.log("user_id", user);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  if (!title || !url || !author) {
    return res
      .status(400)
      .json({ error: "Title  URL and Author are required" });
  }
  // Create a new blog with the user ID
  const newBlog = new Blog({
    title,
    author,
    likes,
    url,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  // Update user's list of blogs
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  console.log("userBlogs", user.blogs);
  response.status(201).json(savedBlog);

  // .catch((error) => {
  //   logger.error(`Blog not created, ${error.message}`);
  // });
};

const deleteBlog = async (request, response, next) => {
  try {
    const { id } = request.params;
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const blog = await Blog.findById(id);
    const user = await User.findById(decodedToken.id);

    // Check if the blog exists
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    // Check if the authenticated user is the creator of the blog
    if (blog.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: "Unauthorized" });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);
    response.status(204).json({ message: "Blog successfully deleted" }).end();
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  const blog = {
    likes: likes,
  };

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  res.status(204).json(updateBlog).end();
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
};

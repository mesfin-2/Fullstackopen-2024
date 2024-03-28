const Blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  return res.json(blogs);

  // .catch((error) => {
  //   logger.error(`No Blog list found, ${error.message}`);
  // });
};

const createBlog = async (req, res) => {
  const { title, url, author, likes = 0, userId } = req.body;
  // Get any user from the database to assign as the creator of the blog
  const user = await User.findById(userId);
  //console.log("user_id", user);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (!title || !url || !author) {
    return res
      .status(400)
      .json({ error: "Title  URL and Author are required" });
  }

  const newBlog = new Blog({
    title,
    author,
    likes,
    url,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);

  // .catch((error) => {
  //   logger.error(`Blog not created, ${error.message}`);
  // });
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(204).end();
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

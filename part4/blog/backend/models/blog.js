const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
  },
  url: String,
  likes: {
    type: Number,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    minlength: 3,
  },
  author: {
    type: String,
    required: false,
    minlength: 2,
  },
  url: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },

  user: {
    //the blog references the user who created it, and the user has an array of references to all of the blogs created by them.
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

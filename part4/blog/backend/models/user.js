const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: String,
  name: String,

  blogs: [
    {
      //The ids of the blogs are stored within the user document as an array of Mongo ids.
      //The type of the field is ObjectId that references blog-style documents.
      //Mongo does not inherently know that this is a field that references blogs,
      // the syntax is purely related to and defined by Mongoose.
      //the user has an array of references to all of the blogs created by them.

      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const User = mongoose.model("User", userScheme);

module.exports = User;

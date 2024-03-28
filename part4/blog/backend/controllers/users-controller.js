const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, password, name } = req.body;

  /**
   * first checking if both username and password are provided and
   *  if they meet the minimum length requirement. Then, it checks
   *  if the username is already taken.
   *  If any of these conditions fail, it returns an appropriate error
   *  response with a status code of 400.
   *
   */

  if (!username || !password || username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: "Password and username length too short, must be greater than 3",
    });
  }

  const existedUser = await User.findOne({ username });
  if (existedUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash, //we don't want to store the password into db, we store hashed pw
  });

  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    author: 1,
  });
  res.status(200).json(users);
};

module.exports = {
  createUser,
  getAllUsers,
};

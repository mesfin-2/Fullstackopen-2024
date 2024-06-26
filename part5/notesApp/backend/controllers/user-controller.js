const bcrypt = require("bcrypt");
const User = require("../models/user-model");

const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    res.status(400).json({ error: "username and password required" });
  }
  //check if the username is already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    important: 1,
  });
  res.json(users);
};

module.exports = {
  createUser,
  getAllUsers,
};

const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.post("/", async (req, res) => {
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
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = usersRouter;

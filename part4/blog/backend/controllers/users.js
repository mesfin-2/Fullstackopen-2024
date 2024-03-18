const { setMaxListeners } = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    res.status(400).json({ error: "username and password required" });
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHash, //we don't want to store the password into db, we store hashed pw
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = userRouter;

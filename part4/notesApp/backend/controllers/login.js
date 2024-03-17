const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  //searching for the user from the database by the username attached to the request.
  const user = await User.findOne({ username });
  //compare used to check if the password is correct:
  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  //checks the password, also attached to the request.
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  //If the password is correct, a token is created with the method jwt.sign.

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;

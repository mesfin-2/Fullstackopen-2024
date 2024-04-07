const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const login = async (req, res) => {
  const { username, password } = req.body;

  //searching for the user from the database by the username attached to the request.
  const user = await User.findOne({ username });
  //compare used to check if the password is correct:
  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  //checks the password, also attached to the request.
  if (!user && !passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  //If the password is correct, a token is created with the method jwt.sign.
  // token expires in 60*60 seconds, that is, in one hour
  // If user successfully logged in, generate a JWT token
  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({ token, username: user.username, name: user.name });

  // res
  //   .status(200)
  //   .send({ token, username: user.username, name: user.name, id: user._id });

  // Set the token into a cookie
  // res
  //   .cookie("user_token", token, { httpOnly: true, path: "/" })
  //   .status(200)
  //   .json(userForToken); //everything except password
};

module.exports = login;

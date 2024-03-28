const user = require("../controllers/users-controller");
const { setMaxListeners, findOne } = require("../models/blog");
const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.post("/", user.createUser);

userRouter.get("/", user.getAllUsers);

module.exports = userRouter;

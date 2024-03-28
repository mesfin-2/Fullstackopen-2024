const login = require("../controllers/auth-controler");
const { setMaxListeners, findOne } = require("../models/blog");
const User = require("../models/user");
const authRouter = require("express").Router();

authRouter.post("/login", login);

module.exports = authRouter;

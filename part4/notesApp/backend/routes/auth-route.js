const authRouter = require("express").Router();
const login = require("../controllers/auth-controller");

authRouter.post("/", login);

module.exports = authRouter;

const users = require("../controllers/user-controller");
const usersRouter = require("express").Router();

usersRouter.post("/", users.createUser);

usersRouter.get("/", users.getAllUsers);

module.exports = usersRouter;

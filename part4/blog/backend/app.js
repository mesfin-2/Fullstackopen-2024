const cors = require("cors");
const express = require("express");
const blogsRouter = require("./routes/blogs-route");
const userRouter = require("./routes/users-route");
const authRouter = require("./routes/auth-route");

const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const middleware = require("./middlewares/middleware");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
/**
 Note that it is possible to register a middleware only 
 for a specific set of routes. So instead of using userExtractor with all the routes,
 * 
 */
app.use(middleware.tokenExtractor);
//app.use(middleware.userExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

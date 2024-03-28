const cors = require("cors");
const express = require("express");
const blogsRouter = require("./routes/blogs-route");
const userRouter = require("./routes/users-route");
const authRouter = require("./routes/auth-route");
const {
  requestLogger,
  errorHandler,
  unknownEndpoint,
} = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

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
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(requestLogger);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

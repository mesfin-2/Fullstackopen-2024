const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./routes/notes-route");
const middleware = require("./middlewares/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users-route");
const authRouter = require("./routes/auth-route");

mongoose.set("strictQuery", false);

logger.info("connecting to  Mongodb");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.tokenExtractor);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

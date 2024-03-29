const { Error } = require("mongoose");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "Malformatted ID" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
    case "MongoServerError":
      if (error.code === 11000) {
        return res.status(400).json({ error: "Username must be unique" });
      }
    case "JsonWebTokenError":
      return res.status(401).json({ error: "Token missing or invalid" });
    case "TokenExpiredError":
      return res.status(401).json({ error: "Token expired" });
    default:
      return next(error);
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};

require("dotenv").config();

//The handling of environment variables is extracted into a separate utils/config.js file:
//The other parts of the application can access the environment variables by importing this configuration module:

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};

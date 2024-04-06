/**
 * The logger has two functions, info for printing normal log messages, and error for all error messages.
 * @param  {...any} params
 */

const info = (...params) => {
  //logger does not print to the console in test mode:
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};

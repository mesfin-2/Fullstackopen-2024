const express = require("express");
const app = require("./app");
const cors = require("cors");
const { MONGODB_URI, PORT } = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

const mongoose = require("mongoose");
const config = require("../utils/config.js");
const logger = require("../utils/logger.js");

//command line parameter

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;
console.log("connecting to", url);
//console.log("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

//const Note = mongoose.model("Note", noteSchema);

//Transform The mongoose _id object to id
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);

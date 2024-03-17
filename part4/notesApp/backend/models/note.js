const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: Boolean,
  user: {
    //the note references the user who created it, and the user has an array of references to all of the notes created by them.
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//Transform The mongoose _id object to id
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);

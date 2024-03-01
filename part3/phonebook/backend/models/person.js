const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("conection error" + error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//Transform The mongoose _id object to id
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
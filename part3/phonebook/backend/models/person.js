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
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: [true, " Phone number required"],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{6,}/.test(v);//033-987654
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
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

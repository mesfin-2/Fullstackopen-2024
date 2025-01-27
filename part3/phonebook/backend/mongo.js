const mongoose = require("mongoose");
const config = require("./utils/config");


//console.log(process.argv[2] === process.argv[2]);
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

//command line parameter
//const password = process.argv[2];
//console.log("password", password);
const name = process.argv[3];
//console.log("name", name);
const number = process.argv[4];

//const url = `mongodb+srv://user:${password}@persons.v2w9w.mongodb.net/phonebook`;
//const url = "mongodb+srv://user:user@cluster0.v2w9w.mongodb.net/";
const url = config.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(` ${person.name} ${person.number} `);
    });
    mongoose.connection.close();
  });
}

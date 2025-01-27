require("dotenv").config();
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.get("/", (req, res) => {
  res.send("Its working");
});
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons);
  });
});
app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res
      .send(
        `<p>Phonebook has info for ${persons.length}
         people(s) </p>${new Date()}<p></p>`
      )
      .end();
  });
});
app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((result) => {
      res.json(result);
    })
    // Pass error to errorHandler middleware
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end(); //no more operation
    })
    // Pass error to errorHandler middleware
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  // Check if the person already exists by name
  Person.findOne({ name: name })
    .then((existingPerson) => {
      if (existingPerson) {
        return res.status(400).json({ error: "Name must be unique" });
      }

      // If the person doesn't exist, create and save a new person
      const newPerson = new Person({
        name: name,
        number: number,
      });

      return newPerson.save();
    })
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { number } = req.body;

  // Find the existing person by ID
  Person.findByIdAndUpdate(id, { number }, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        // If person with ID exists, update and send updated person as response

        res.json(updatedPerson);
      } else {
        // If person with ID doesn't exist, return 404 Not Found
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
    //When validating an object fails, we return the following default error message from Mongoose:
  } else if (error.name === "ValidationError") {
    /*
    const errors = Object.values(error.errors).map((err) => err.message);
    return response.status(400).json({ error: errors });

    */
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

//const PORT = process.env.PORT;
console.log("PORT", config.PORT);
app.listen(config.PORT, () => {
  console.log(`server Running at port ${config.PORT}`);
  //res.status(200).json(`<h2>Serving running ${PORT}</h2>`);
});




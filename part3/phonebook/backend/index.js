require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js");
const person = require("./models/person.js");

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Its working");
});
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons);
  });
});
app.get("/info", (req, res) => {
  res
    .send(
      `<p>Phonebook has info for ${
        persons.length
      } people </p>${new Date()}<p></p>`
    )
    .end();
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.status(200).send(person);
  }

  res.status(404).end();
});
app.delete("/api/persons/:id", (req, res, error) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end(); //no more operation
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
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
    .catch((error) => {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Server error" });
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`server Running at port ${PORT}`);
  //res.status(200).json(`<h2>Serving running ${PORT}</h2>`);
});

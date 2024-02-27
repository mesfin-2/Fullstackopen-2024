const express = require("express");

const app = express();
app.use(express.json());

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
  res.status(200).json(persons);
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
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end(); //no more operation
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  //const id = req.params.id;
  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 10000), // Math.floor for integer id
  };
  //existing name
  const existingName = persons.find((person) => person.name === newPerson.name);
  if (!existingName) {
    persons = persons.concat(newPerson);
    res.status(201).json(persons);
  } else {
    res.status(404).json({ error: "name must be unique" });
  }
});

const PORT = 3001;
app.listen(PORT, (req, res) => {
  console.log(`server Running at port ${PORT}`);
  //res.status(200).json(`<h2>Serving running ${PORT}</h2>`);
});

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phoneBook.find((person) => person.id === id);
  if (person === undefined) {
    response.sendStatus(404);
  }
  response.json(person);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "name and number missing",
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  if (
    phoneBook.some(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: String(Math.floor(Math.random() * 1000) + 1),
    name: body.name,
    number: body.number,
  };

  phoneBook = phoneBook.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phoneBook = phoneBook.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  const date = new Date().toString();
  const html = `
    <p>Phonebook has info for ${phoneBook.length} people</p>
    <p>${date}</p>
  `;
  response.send(html);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();

let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => response.json(phoneBook));

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phoneBook.find((person) => person.id === id);
  if (person === undefined) {
    response.sendStatus(404);
  }
  response.json(person);
});

app.get("/info", (request, response) => {
  const date = new Date().toString();
  const html = `
    <p>Phonebook has info for ${phoneBook.length} people</p>
    <p>${date}</p>
  `;
  response.send(html);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

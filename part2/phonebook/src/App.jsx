import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with
        <input
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          for (let person of persons) {
            if (newName.toLowerCase() === person.name.toLowerCase()) {
              alert(`${newName} is already added to phonebook`);
              setNewName("");
              return;
            }
          }
          setPersons([...persons, { name: newName, number: newNumber }]);
          setNewName("");
          setNewNumber("");
          setSearch("");
        }}
      >
        <h2>add a new</h2>
        <div>
          name:{" "}
          <input
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
        </div>
        <div>
          number:{" "}
          <input
            onChange={(event) => setNewNumber(event.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;

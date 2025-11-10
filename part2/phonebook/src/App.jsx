import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
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
        }}
      >
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
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { create, getAll, remove, update } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (event) => {
    event.preventDefault();

    for (let person of persons) {
      if (newName.toLowerCase() === person.name.toLowerCase()) {
        handleUpdate(person);
        return;
      }
    }

    create({ name: newName, number: newNumber }).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
      setSearch("");
    });
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      remove(person.id).then((data) =>
        setPersons(persons.filter((p) => p.id !== person.id))
      );
    }
  };

  const handleUpdate = (person) => {
    if (
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      update(person.id, { name: newName, number: newNumber }).then((data) =>
        setPersons(persons.map((p) => (p.id === person.id ? data : p)))
      );
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter search={search} setSearch={setSearch} />

      <h2>add a new</h2>

      <PersonForm
        handleCreate={handleCreate}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

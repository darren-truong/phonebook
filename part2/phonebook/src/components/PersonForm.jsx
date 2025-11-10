import { create } from "../services/persons";

export const PersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  setSearch,
}) => {
  return (
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

        create({ name: newName, number: newNumber }).then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          setSearch("");
        });
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
  );
};

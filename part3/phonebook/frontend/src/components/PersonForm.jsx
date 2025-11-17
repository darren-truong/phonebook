export const PersonForm = ({
  handleCreate,
  setNewName,
  newName,
  setNewNumber,
  newNumber,
}) => {
  return (
    <form onSubmit={handleCreate}>
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

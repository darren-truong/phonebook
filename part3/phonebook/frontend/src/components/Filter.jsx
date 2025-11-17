export const Filter = ({ search, setSearch }) => {
  return (
    <div>
      filter shown with
      <input
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
    </div>
  );
};

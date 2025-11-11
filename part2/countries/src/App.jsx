import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "./components/Country";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  let searchResults = null;

  if (filteredCountries.length > 10) {
    searchResults = <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1) {
    searchResults = (
      <div>
        {filteredCountries.map((country) => (
          <div>
            {country.name.common}{" "}
            <button onClick={() => setSearch(country.name.common)}>Show</button>
          </div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    searchResults = <Country country={country} />;
  } else {
    searchResults = <div>No matches found</div>;
  }

  return (
    <div>
      <div>
        find countries{" "}
        <input onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      <div>{search && searchResults}</div>
    </div>
  );
}

export default App;

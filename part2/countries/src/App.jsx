import { useEffect, useState } from "react";
import axios from "axios";

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
          <div>{country.name.common}</div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    searchResults = (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          Capital {country.capital[0]}
          <br />
          Area {country.area}
        </p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
      </div>
    );
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

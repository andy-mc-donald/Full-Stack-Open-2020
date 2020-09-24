import React, { useState, useEffect } from "react";
import axios from "axios";

const TooManyMatches = () => {
  return <p>Too many matches, specify another filter</p>;
};

const ListView = ({ countriesToShow, onClick }) => {
  return (
    <ul>
      {countriesToShow.map((x) => (
        <li key={x.name}>
          {x.name}
          <button id={x.name} onClick={onClick}>show</button>
        </li>
      ))}
    </ul>
  );
};

const CountryDetail = ({ countriesToShow }) => {
  return (
    <>
      {countriesToShow.map((x) => (
        <div key={x.name}>
          <h1>{x.name}</h1>
          <p>capital {x.capital}</p>
          <p>population {x.population}</p>
          <h3>Languages</h3>
          <ul>
            {x.languages.map((y) => (
              <li key={y.name}>{y.name}</li>
            ))}
          </ul>
          <img src={x.flag} width="300px" alt="country flag" />
        </div>
      ))}
    </>
  );
};

const Display = ({ countriesToShow, onClick }) => {
  return (
    <div>
      {countriesToShow.length > 10 ? (
        <TooManyMatches />
      ) : countriesToShow.length > 1 ? (
        <ListView countriesToShow={countriesToShow} onClick={onClick} />
      ) : (
        <CountryDetail countriesToShow={countriesToShow} />
      )}
    </div>
  );
};

const App = () => {
  const [countriesAll, setCountriesAll] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountriesAll(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    event.target.value.length !== 0 ? setFilter(true) : setFilter(false);
  };

  const countriesToShow = !filter
    ? countriesAll
    : countriesAll.filter((x) =>
        x.name.toUpperCase().includes(searchInput.toUpperCase())
      );

  // console.log(countriesToShow);

  const handleClick = (e) => {
    setSearchInput(e.target.id)
  }

  return (
    <>
      <div>
        Find countries
        <input value={searchInput} onChange={handleSearch} />
      </div>
      <div>
        <Display countriesToShow={countriesToShow} onClick={handleClick} />
      </div>
    </>
  );
};

export default App;

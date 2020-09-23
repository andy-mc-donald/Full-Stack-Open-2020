import React, { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ countriesToShow }) => {
  
  return(
    <div>
    { countriesToShow.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : countriesToShow.length > 1 ? (
      <ul>
      {countriesToShow.map((x) => (
        <li key={x.name}>{x.name}</li>
      ))}
    </ul>
    ) : (
      <>
      {countriesToShow.map((x) => (
        <div key={x.name}>
        <h1>{x.name}</h1>
        <p>capital {x.capital}</p>
        <p>population {x.population}</p>
        <h3>Languages</h3>
        <ul>
          {x.languages.map((y)=> (
            <li key={y.name}>{y.name}</li>
          ))}
        </ul>
        <img src={x.flag} width="300px" />
        </div>
      ))}
     </>
    )
  }
  </div>
  )
}


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

console.log(countriesToShow);

  return (
    <>
      <div>
        Find countries
        <input value={searchInput} onChange={handleSearch} />
      </div>
      <div>
        {/* <ul>
          {countriesToShow.map((x) => (
            <li key={x.name}>{x.name}</li>
          ))}
        </ul> */}
        <Display countriesToShow={countriesToShow} />
      </div>
    </>
  );
};

export default App;

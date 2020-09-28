import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

const App = () => {
  const [countriesAll, setCountriesAll] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountriesAll(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (searchInput !== "") {
      setCountriesFiltered(
        countriesAll.filter((x) =>
          x.name.toUpperCase().includes(searchInput.toUpperCase())
        )
      );
    }
  }, [searchInput, countriesAll]);

  //   console.log(countriesFiltered);

  useEffect(() => {
    if (countriesFiltered.length === 1) {
      setCapital(countriesFiltered.map((x) => x.capital));
      setCountry(countriesFiltered.map((x) => x.name.toLowerCase()));
    }
    if (countriesFiltered.length !== 1) {
      setCapital("");
      setCountry("");
    }
  }, [countriesFiltered]);

  //   console.log(capital)
  //   console.log(country);

  useEffect(() => {
    if (capital !== "") {
      console.log("weather effect");
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital},${country}&appid=${api_key}`
        )
        .then((response) => {
          console.log("weather promise fulfilled");
          setWeatherData(response.data);
        });
    }
  }, [capital, country, api_key]);

//   console.log(weatherData);

  const handleClick = (e) => {
    setSearchInput(e.target.id);
  };

  return (
    <>
      <div>
        Find countries
        <input value={searchInput} onChange={handleSearch} />
      </div>
      <div>
        <Display
          countriesFiltered={countriesFiltered}
          onClick={handleClick}
          weatherData={weatherData}
        />
      </div>
    </>
  );
};

export default App;

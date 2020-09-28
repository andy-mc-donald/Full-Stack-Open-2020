import React from "react";

const CountryDetail = ({ countriesFiltered, weatherData }) => {
    return (
      <>
        {countriesFiltered.map((x) => (
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
            <h2>Weather in {x.capital}</h2>
          </div>
        ))}
        <div>
          {!weatherData.main ? (
            <p></p>
          ) : (
            <p>
              Temperature: {(weatherData.main.temp - 273.15).toFixed(1)} Celsius
            </p>
          )}
          {!weatherData.weather ? (
            <p></p>
          ) : (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather condition icon"
            />
          )}
          {!weatherData.wind ? (
            <p></p>
          ) : (
            <p>
              Wind speed: {(weatherData.wind.speed * 2.237).toFixed(1)} Miles per
              hour
            </p>
          )}
        </div>
      </>
    );
  };

  export default CountryDetail;
import React from "react";
import TooManyMatches from "./TooManyMatches";
import ListView from "./ListView";
import CountryDetail from "./CountryDetail";

const Display = ({ countriesFiltered, onClick, weatherData }) => {
    return (
      <div>
        {countriesFiltered.length > 10 ? (
          <TooManyMatches />
        ) : countriesFiltered.length > 1 ? (
          <ListView countriesFiltered={countriesFiltered} onClick={onClick} />
        ) : (
          <CountryDetail
            countriesFiltered={countriesFiltered}
            weatherData={weatherData}
          />
        )}
      </div>
    );
  };

  export default Display;
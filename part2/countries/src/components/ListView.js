import React from "react";

const ListView = ({ countriesFiltered, onClick }) => {
    return (
      <ul>
        {countriesFiltered.map((x) => (
          <li key={x.name}>
            {x.name}
            <button id={x.name} onClick={onClick}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  };

  export default ListView;
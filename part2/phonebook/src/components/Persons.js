import React from "react";

const Persons = ({person, onClick}) => {
    return (
        // <ul>
        // {personsToShow.map((person) => (
          <li>
            {person.name} {person.number} <button onClick={onClick}>delete</button>
          </li>
        // ))}
      // </ul>
    )
}

export default Persons;
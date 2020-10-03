import React from "react";

const Persons = ({person, onClick}) => {
    return (
          <li>
            {person.name} {person.number} <button onClick={onClick}>delete</button>
          </li>
    )
}

export default Persons;
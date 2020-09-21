import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040123456" },
    { name: "Ada Lovelace", number: "39445323523" },
    { name: "Dan Abramov", number: "1243234345" },
    { name: "Mary Poppendieck", number: "39236423122" },
  ]);
  const [newSearch, setNewSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addPerson = (event) => {
    event.preventDefault();

    const add = () => {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
    };

    persons.find((x) => x.name.toUpperCase() === newName.toUpperCase())
      ? alert(`${newName} is already added to phonebook`)
      : add();

    setNewName("");
    setNewNumber("");
  };

  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    setNewSearch(e.target.value);
    e.target.value.length === 0 ? setShowAll(true) : setShowAll(false);
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((x) =>
        x.name.toUpperCase().includes(newSearch.toUpperCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h2>Add a new...</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;

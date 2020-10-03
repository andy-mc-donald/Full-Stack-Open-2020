import React, { useState, useEffect } from "react";
// import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import peopleService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    // console.log("effect");
    // axios
    // .get("http://localhost:3001/persons")
    peopleService
    .getAll()
    .then(allPeople => {
      setPersons(allPeople);
    });
  }, []);
  console.log("render", persons.length, "people");

  const addPerson = (event) => {
    event.preventDefault();

    // =====THIS EARLIER VERSION OF THE CODE CHECKS IF A NAME EXISTS ALREADY
    //=======AND EITHER ALERTS IF IT DOES OR UPDATES IF IT DOESN'T
    // const add = () => {
    //   const personObject = {
    //     name: newName,
    //     number: newNumber,
    //   };
    //   setPersons(persons.concat(personObject));
    // };

    // persons.find((x) => x.name.toUpperCase() === newName.toUpperCase())
    //   ? alert(`${newName} is already added to phonebook`)
    //   : add();

    const personObject = {
      name: newName,
      number: newNumber
    }

    // axios
    // .post("http://localhost:3001/persons", personObject)
    peopleService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    })

    // setNewName("");
    // setNewNumber("");
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

  const handleDelete = (id) => {
    const selected = persons.find(person => person.id === id);
    if(!window.confirm(`Delete ${selected.name}?`)){
      return;
    }
    peopleService.remove(id);
    setPersons(persons.filter(person => person.id !== id));
  }

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
      <ul>
      {personsToShow.map((person) => (
      <Persons key={person.id} person={person} onClick={() => handleDelete(person.id)} />
      ))}
      </ul>
    </div>
  );
};

export default App;

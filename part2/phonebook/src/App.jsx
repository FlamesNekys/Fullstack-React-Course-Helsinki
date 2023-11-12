import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "axios";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then((response) => setPersons(response.data));
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		let checker = 0;
		persons.forEach((person) =>
			person.name === newName ? (checker += 1) : false
		);
		if (checker) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);
	const handleFilter = (e) => {
		setNewFilter(e.target.value);
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter newFilter={newFilter} handleFilter={handleFilter} />

			<h2>Add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} newFilter={newFilter} />
		</div>
	);
};

export default App;

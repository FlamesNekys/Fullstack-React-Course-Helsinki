import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

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

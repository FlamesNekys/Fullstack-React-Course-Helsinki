import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "axios";
import { useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		personService.getAll().then((persons) => setPersons(persons));
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		const existingPerson = persons.find(
			(person) => person.name === newName
		);
		if (existingPerson.number === newNumber) {
			alert(`${newName} is already in the phonebook`);
		} else if (existingPerson.number !== newNumber) {
			if (
				window.confirm(
					`${newName} is already in the phonebook, replace the old number with a new one?`
				)
			) {
				personService
					.update(existingPerson.id, {
						...existingPerson,
						number: newNumber,
					})
					.then((updatedPerson) =>
						setPersons(
							persons.map((person) =>
								person.name !== newName ? person : updatedPerson
							)
						)
					);
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};
			personService.create(newPerson).then((person) => {
				setPersons(persons.concat(person));
				setNewName("");
				setNewNumber("");
			});
		}
	};

	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);
	const handleFilter = (e) => setNewFilter(e.target.value);
	const handleDeleteClick = (id) => {
		if (
			window.confirm(
				`Do you want to delete ${
					persons.find((person) => person.id === id).name
				}?`
			)
		)
			personService
				.remove(id)
				.then(setPersons(persons.filter((person) => person.id !== id)));
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
			<Persons
				persons={persons}
				newFilter={newFilter}
				handleDeleteClick={handleDeleteClick}
			/>
		</div>
	);
};

export default App;

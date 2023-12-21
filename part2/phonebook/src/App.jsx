import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "axios";
import { useEffect } from "react";
import personService from "./services/persons";
import InfoBlock from "./components/InfoBlock";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [infoBlock, setInfoBlock] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService
			.getAll()
			.then((persons) => setPersons(persons))
			.catch((e) => console.log(e.message));
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		const existingPerson = persons.find(
			(person) => person.name === newName
		);
		if (existingPerson && existingPerson.number === newNumber) {
			alert(`${newName} is already in the phonebook`);
		} else if (existingPerson && existingPerson.number !== newNumber) {
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
					.then((updatedPerson) => {
						setPersons(
							persons.map((person) =>
								person.name !== newName ? person : updatedPerson
							)
						);
						setInfoBlock(
							`The number of ${newName} is successfully changed`
						);
						setTimeout(() => setInfoBlock(null), 5000);
					})
					.catch((e) => {
						if (e.response.data.error.includes("Validation")) {
							setErrorMessage(e.response.data.error);
							setTimeout(() => setErrorMessage(null), 5000);
						} else {
							setErrorMessage(
								`${newName} was already deleted from the server`
							);
							setTimeout(() => setErrorMessage(null), 5000);
							setPersons(
								persons.filter(
									(person) => person.name !== newName
								)
							);
						}
					})
					.finally(() => {
						setNewName("");
						setNewNumber("");
					});
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};
			personService
				.create(newPerson)
				.then((person) => {
					setPersons(persons.concat(person));
					setInfoBlock(`${newName} is successfully added`);
					setTimeout(() => setInfoBlock(null), 5000);
				})
				.catch((e) => {
					setErrorMessage(e.response.data.error);
					setTimeout(() => setErrorMessage(null), 5000);
				})
				.finally(() => {
					setNewName("");
					setNewNumber("");
				});
		}
	};

	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);
	const handleFilter = (e) => setNewFilter(e.target.value);
	const handleDeleteClick = (id) => {
		const deleted = persons.find((person) => person.id === id).name;
		if (window.confirm(`Do you want to delete ${deleted}?`))
			personService
				.remove(id)
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id));
					setInfoBlock(`${deleted} is successfully deleted`);
					setTimeout(() => setInfoBlock(null), 5000);
				})
				.catch((e) => console.log(e.message));
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<InfoBlock infoBlock={infoBlock} />
			<ErrorMessage errorMessage={errorMessage} />
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

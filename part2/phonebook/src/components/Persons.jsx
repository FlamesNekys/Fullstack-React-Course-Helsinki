import React from "react";
import Person from "./Person";

const Persons = ({ persons, newFilter, handleDeleteClick }) => {
	return (
		<div>
			{persons
				.filter((person) =>
					person.name.toLowerCase().includes(newFilter.toLowerCase())
				)
				.map((person) => (
					<Person
						key={person.id}
						person={person}
						handleDeleteClick={() => handleDeleteClick(person.id)}
					/>
				))}
		</div>
	);
};

export default Persons;

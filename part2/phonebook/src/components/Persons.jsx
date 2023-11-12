import React from "react";

const Persons = ({ persons, newFilter }) => {
	return (
		<div>
			{persons
				.filter((person) =>
					person.name.toLowerCase().includes(newFilter.toLowerCase())
				)
				.map((person) => (
					<p key={person.id} style={{ fontSize: 18 }}>
						{person.name} {person.number}
					</p>
				))}
		</div>
	);
};

export default Persons;

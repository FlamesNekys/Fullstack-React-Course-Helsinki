import React from "react";

const Person = ({ person, handleDeleteClick }) => {
	return (
		<div>
			<p style={{ fontSize: 18 }}>
				{person.name} {person.number}
			</p>
			<button onClick={handleDeleteClick}>Delete</button>
		</div>
	);
};

export default Person;

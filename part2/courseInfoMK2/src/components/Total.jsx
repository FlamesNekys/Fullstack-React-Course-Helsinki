import React from "react";

const Total = ({ parts }) => {
	return (
		<div>
			<h3>
				Total of {parts.reduce((acc, part) => acc + part.exercises, 0)}{" "}
				exercises
			</h3>
		</div>
	);
};

export default Total;

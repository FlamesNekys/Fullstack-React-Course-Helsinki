import React from "react";

const StatisticLine = ({ name, value }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{value ? value : 0}</td>
		</tr>
	);
};

export default StatisticLine;

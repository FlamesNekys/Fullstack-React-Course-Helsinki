import React from "react";
import Stat from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
	const total = good + bad + neutral;

	if (!good && !neutral && !bad) return <p>No feedback given</p>;

	return (
		<table>
			<tbody>
				<Stat name={"Good"} value={good} />
				<Stat name={"Neutral"} value={neutral} />
				<Stat name={"Bad"} value={bad} />
				<Stat name={"Total"} value={total} />
				<Stat name={"Average"} value={(good - bad) / total} />
				<Stat name={"Positive (in %)"} value={(good * 100) / total} />
			</tbody>
		</table>
	);
};

export default Statistics;

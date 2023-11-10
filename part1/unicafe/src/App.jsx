import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
	};
	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};
	const handleBadClick = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>Give feedback</h1>
			<div style={{ display: "flex" }}>
				<Button onClick={handleGoodClick} text={"Good"} />
				<Button onClick={handleNeutralClick} text={"Neutral"} />
				<Button onClick={handleBadClick} text={"Bad"} />
			</div>

			<h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;

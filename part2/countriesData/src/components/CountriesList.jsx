import React from "react";

const CountriesList = ({ filtered, handleShowBtn }) => {
	return (
		<div>
			{filtered.map((country) => (
				<div key={country.name.official}>
					{country.name.common}{" "}
					<button onClick={() => handleShowBtn(country)}>show</button>
				</div>
			))}
		</div>
	);
};

export default CountriesList;

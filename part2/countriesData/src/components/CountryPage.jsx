import React from "react";

const CountryPage = ({ filtered, weather }) => {
	const languages = [];
	for (let key in filtered.languages) {
		languages.push(filtered.languages[key]);
	}

	return (
		<div>
			<h1>{filtered.name.common}</h1>
			<p>capital {filtered.capital}</p>
			<p>area {filtered.area}</p>
			<h2>languages:</h2>
			<ul>
				{languages.map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={filtered.flags.png} alt={filtered.flags.alt} />
			{weather ? (
				<div>
					<h2>Weather in {filtered.capital}</h2>
					<div>
						temperature {Math.round(weather.main.temp - 273.15)}{" "}
						Celcius
					</div>
					<img
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt="image of the weather condition"
					/>
					<div>wind {weather.wind.speed} m/s</div>
				</div>
			) : null}
		</div>
	);
};

export default CountryPage;

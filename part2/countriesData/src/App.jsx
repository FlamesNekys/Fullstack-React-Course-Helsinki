import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filtered from "./components/Filtered";
import weatherService from "./services/weather";

function App() {
	const [countries, setCountries] = useState([]);
	const [query, setQuery] = useState("");
	const [filtered, setFiltered] = useState(null);
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		countryService
			.getAll()
			.then((countries) => setCountries(countries))
			.catch((e) => console.log(e.message));
	}, []);

	useEffect(() => {
		const filter = countries.filter((country) =>
			country.name.common.toLowerCase().includes(query.toLowerCase())
		);
		if (filter.length === countries.length) setFiltered(null);
		if (filter.length < 1) setFiltered(null);
		if (filter.length > 10)
			setFiltered("Too many matches, specify another filter");
		if (query.length === 0) setFiltered(null);
		if (filter.length > 1 && filter.length <= 10) setFiltered(filter);
		if (filter.length === 1) {
			setFiltered(filter[0]);
			weatherService(filter[0].capital).then((data) => {
				setWeather(data);
			});
		}
	}, [query]);

	const handleQuery = (e) => setQuery(e.target.value);
	const handleShowBtn = async (country) => {
		await countryService
			.getOne(country.name.common.toLowerCase())
			.then((country) => setFiltered(country))
			.catch((e) => console.log(e));
		weatherService(country.capital).then((data) => {
			setWeather(data);
		});
	};
	return (
		<div>
			find countries
			<input onChange={handleQuery} />
			<Filtered
				filtered={filtered}
				handleShowBtn={handleShowBtn}
				weather={weather}
			/>
		</div>
	);
}

export default App;

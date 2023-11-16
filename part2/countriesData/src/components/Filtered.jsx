import React from "react";
import CountryPage from "./CountryPage";
import CountriesList from "./CountriesList";

const Filtered = ({ filtered, handleShowBtn, weather }) => {
	if (!filtered) return null;

	if (typeof filtered === "string") return <div>{filtered}</div>;

	if (Array.isArray(filtered))
		return (
			<CountriesList filtered={filtered} handleShowBtn={handleShowBtn} />
		);

	if (typeof filtered === "object")
		return <CountryPage filtered={filtered} weather={weather} />;
};

export default Filtered;

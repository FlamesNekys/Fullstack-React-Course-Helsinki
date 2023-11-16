import React from "react";

const ErrorMessage = ({ errorMessage }) => {
	if (!errorMessage) return null;

	const styles = {
		fontSize: 20,
		color: "red",
		border: "2px solid red",
		borderRadius: 7,
		background: "lightgrey",
		padding: 10,
		marginBottom: 10,
	};

	return <div style={styles}>{errorMessage}</div>;
};

export default ErrorMessage;

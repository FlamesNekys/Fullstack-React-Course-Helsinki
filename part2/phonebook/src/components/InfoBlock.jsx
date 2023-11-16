import React from "react";

const InfoBlock = ({ infoBlock }) => {
	if (!infoBlock) return null;

	const styles = {
		fontSize: 20,
		color: "green",
		border: "2px solid green",
		borderRadius: 7,
		background: "lightgrey",
		padding: 10,
		marginBottom: 10,
	};

	return <div style={styles}>{infoBlock}</div>;
};

export default InfoBlock;

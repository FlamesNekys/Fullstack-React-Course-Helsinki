import React from "react";

const Button = ({ onClick, text }) => {
	return (
		<div>
			<button onClick={onClick} style={{ marginRight: 8 }}>
				{text}
			</button>
		</div>
	);
};

export default Button;

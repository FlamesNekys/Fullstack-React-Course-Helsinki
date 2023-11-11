import React from "react";

const Content = ({ parts }) => {
	return (
		<div style={{ fontSize: 18 }}>
			{parts.map((part) => (
				<p key={part.id}>
					{part.name} {part.exercises}
				</p>
			))}
		</div>
	);
};

export default Content;

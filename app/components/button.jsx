import React from 'react';

const Button = ({ onClick, text }) => {
	return (
		<button
			className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md"
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;

import Loader from './loader';
import React from 'react';

const Button = ({ loading = false, onClick, text }) => {
	return (
		<button
			className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md w-full"
			onClick={onClick}
		>
			{loading ? <Loader size="md" /> : text}
		</button>
	);
};

export default Button;

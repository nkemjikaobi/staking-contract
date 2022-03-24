import React from 'react';

const Entrace = ({ launchApp }) => {
	return (
		<div>
			<button
				onClick={launchApp}
				className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
			>
				BEGIN
			</button>
		</div>
	);
};

export default Entrace;

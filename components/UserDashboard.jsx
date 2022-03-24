import React, { useState } from 'react';

const UserDashboard = ({
	amountStaked,
	tokenBalance,
	address,
	buy,
	stake,
	unStake,
	transfer,
	loading,
	setLoading
}) => {
	const [buyAmount, setBuyAmount] = useState(0);
	const [stakeAmount, setStakeAmount] = useState(0);
	const [unStakeAmount, setUnStakeAmount] = useState(0);
	const [trfAdd, setTrfAdd] = useState('');
	const [trfAmount, setTrfAmount] = useState(0);

	return (
		<div>
			<main className='container w-600 mt-32'>
				<h1 className='mb-4'>Staking contract</h1>
				<p>Welcome user with address: {address}</p>
				<div className=''>
					<div>
						<input
							className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
							type='text'
							placeholder='Amount of ether'
							value={buyAmount}
							onChange={e => setBuyAmount(e.target.value)}
						/>
						<button
							onClick={() => {
								buy(buyAmount);
								setLoading(true);
							}}
							className='bg-white  flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							{loading ? 'In Progress...' : 'Buy Token'}
						</button>
					</div>
					<hr />
					<div className='mt-10'>
						<input
							className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
							type='text'
							placeholder='Amount of tokens'
							value={stakeAmount}
							onChange={e => setStakeAmount(e.target.value)}
						/>
						<button
							onClick={() => {
								stake(stakeAmount);
								setLoading(true);
							}}
							className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							{loading ? 'In Progress...' : 'Stake Token'}
						</button>
					</div>
					<hr />
					<div className='mt-10'>
						<input
							className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
							type='text'
							placeholder='Amount of tokens'
							value={unStakeAmount}
							onChange={e => setUnStakeAmount(e.target.value)}
						/>
						<button
							onClick={() => {
								unStake(unStakeAmount);
								setLoading(true);
							}}
							className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							{loading ? 'In Progress...' : 'Unstake Token'}
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default UserDashboard;

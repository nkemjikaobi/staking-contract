import { useState } from 'react';
import Web3 from 'web3';
import StakerContract from '../contracts/contracts/artifacts/Staker.json';
import Entrace from './Entrace';
import UserDashboard from './UserDashboard';

function Home1() {
	const [loaded, setLoaded] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState('');
	const [stakeContract, setStakeContract] = useState({});

	const [tokensOwned, setTokensOwned] = useState(0);
	const [tokensStaked, setTokensStaked] = useState(0);
	const [loading, setLoading] = useState(false);

	const init = async () => {
		let provider = window.ethereum;
		console.log(provider);

		if (typeof provider !== 'undefined') {
			provider
				.request({ method: 'eth_requestAccounts' })
				.then(accounts => {
					setSelectedAccount(accounts[0]);
					console.log(`Selected account is ${selectedAccount}`);
				})
				.catch(err => {
					console.log(err);
					return;
				});

			window.ethereum.on('accountsChanged', function (accounts) {
				setSelectedAccount(accounts[0]);
				console.log(`Selected account changed to ${selectedAccount}`);
			});
		}

		const web3 = new Web3(provider);

		setStakeContract(
			new web3.eth.Contract(
				StakerContract.abi,
				'0x6d24401A15AAD3De1b4CfA7da0d664756c4DbFb6'
			)
		);

		console.log(stakeContract);

		setLoaded(true);
	};

	const tokenBalance = async () => {
		let value;
		console.log('Hey');
		console.log(stakeContract);
		let p = await stakeContract.methods.getTokenBalance();
		console.log(p);
	};

	const tokenStaked = async () => {
		return await stakeContract.methods
			.buyToken()
			.send({ from: selectedAccount });
	};

	const buyToken = amount => {
		console.log(tokenBalance());
		setLoading(true);
		let provider = window.ethereum;
		stakeContract.methods
			.buyToken()
			.send({
				from: selectedAccount,
				value: new Web3(provider).utils.toWei(amount, 'ether'),
			})
			.then(tx => {
				console.log(tx);
				alert('Successful');
				setLoading(false);
			})
			.catch(err => {
				alert(err);
			});
	};

	const stake = numOfTokens => {
		setLoading(true);

		console.log(stakeContract);
		stakeContract.methods
			.stakeToken(numOfTokens)
			.send({ from: selectedAccount })
			.then(tx => {
				console.log(tx);
				setLoading(false);

				//alert(tx)
				//setTokensStaked(tokenStaked());
			})
			.catch(err => {
				alert(err);
			});
	};

	const unStake = numOfTokens => {
		setLoading(true);

		stakeContract.methods
			.unstakeToken(numOfTokens)
			.send({ from: selectedAccount })
			.then(tx => {
				console.log(tx);
				alert('Successful');
				setLoading(false);

				setTokensStaked(tokenStaked());
			})
			.catch(err => {
				alert(err);
			});
	};

	const transFer = (address, amount) => {
		console.log(stakeContract);
		stakeContract.methods
			.transferTokens(address, amount)
			.send({ from: selectedAccount })
			.then(tx => {
				console.log(tx);
				alert(tx);
			})
			.catch(err => {
				alert(err);
			});
	};

	return (
		<div className='App'>
			<header className='App-header'>
				{!loaded ? (
					<Entrace launchApp={init} />
				) : (
					<UserDashboard
						amountStaked={tokensStaked}
						tokenBalance={tokensOwned}
						address={selectedAccount}
						buy={buyToken}
						stake={stake}
						unStake={unStake}
						transfer={transFer}
						loading={loading}
						setLoading={setLoading}
					/>
				)}
			</header>
		</div>
	);
}

export default Home1;

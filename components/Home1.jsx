import { useState } from 'react';
import Web3 from 'web3';
// import StakerContract from '../contracts/contracts/artifacts/Staker.json';
import StakerContract from '../src/Staker.json';
import Entrace from './Entrace';
import UserDashboard from './UserDashboard';

function Home1() {
	const [loaded, setLoaded] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState('');
	const [stakeContract, setStakeContract] = useState({});

	const [tokensOwned, setTokensOwned] = useState(0);
	const [tokensStaked, setTokensStaked] = useState(0);
	const [buyLoading, setBuyLoading] = useState(false);
	const [stakeLoading, setStakeLoading] = useState(false);
	const [unstakeLoading, setUnstakeLoading] = useState(false);

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
		let p = await stakeContract.methods.getTokenBalance().call({
			from: selectedAccount,
		});
		setTokensOwned(p);
		console.log({ p });
	};

	const tokenStaked = async () => {
		return await stakeContract.methods
			.getAmountStaked()
			.call({ from: selectedAccount });
	};

	const buyToken = amount => {
		setBuyLoading(true);
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
				setBuyLoading(false);
			})
			.catch(err => {
				alert('Unsuccessful');
				setBuyLoading(false);
			});
	};

	const stake = numOfTokens => {
		setUnstakeLoading(true);

		console.log(stakeContract);
		stakeContract.methods
			.stakeToken(numOfTokens)
			.send({ from: selectedAccount })
			.then(tx => {
				console.log(tx);
				setUnstakeLoading(false);

				//alert(tx)
				//setTokensStaked(tokenStaked());
			})
			.catch(err => {
				alert('Unsuccessful');
				setStakeLoading(false);
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
				alert('Unsuccessful');
				setUnstakeLoading(false);
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
						buyLoading={buyLoading}
						setBuyLoading={setBuyLoading}
						unstakeLoading={unstakeLoading}
						setUnstakeLoading={setUnstakeLoading}
						setStakeLoading={setStakeLoading}
						stakeLoading={stakeLoading}
						balance={tokenBalance}
						selectedAccount={selectedAccount}
						tokenStaked={tokenStaked}
					/>
				)}
			</header>
		</div>
	);
}

export default Home1;

// this file presents an example to connect with a local ETH simluation network called ganache
// require external module web3
const Web3 = require("web3");
// start of ganache development details (ganache is a local blockchain for development purposes)
const ganacheAddress = "0x242969d641398eA2F56CF260a215Dec626BefDff";
const ganacheURL = "HTTP://127.0.0.1:7545";
// end of ganache development details

// initialize a new instation of the class Web3 library, pass the development
// url and address to run a simulation on retrieving data
const web3 = new Web3(ganacheURL);

// in order to retrieve the balance of an account we can run the following snippet
web3.eth
	.getBalance(ganacheAddress, (err, wei) => {
		balance = web3.utils.fromWei(wei, "ether");
	})
	.then(response => {
		console.log("responseblock 1---", response);
	});

// in order to transfer ether from 1 account to another you can write the following function
const account1 = "0x242969d641398eA2F56CF260a215Dec626BefDff";
const account2 = "0xCA981bFa49CF212FeAfb2b68a633de22eE3F4ED1";
// transaction details from account 1 to account 2
web3.eth
	.sendTransaction({
		from: account1,
		to: account2,
		value: web3.utils.toWei("1", "ether")
	})
	.then(() => {
		web3.eth
			.getBalance(account2, (err, wei) => {
				balance = web3.utils.fromWei(wei, "ether");
			})
			.then(response => {
				console.log("responseblock 2---", response);
			});
	});
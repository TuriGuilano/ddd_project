const SHA256 = require("crypto-js/sha256");
class Block {
	// index gives us the position of the block in the chain
	// timeStamp devines when the block was created
	// data devines all the relevent data to this specific block: payments, value etc
	// previoushash is a string that contains the hash of the block before the current block : insures the integrety of our blockchain
	constructor(index, timestamp, data, previousHash = "") {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(
			this.index +
			this.previousHash +
			this.timestamp +
			JSON.stringify(this.data) +
			this.nonce
		).toString();
	}

	mineBlock(difficulty) {
		// quick trick to generate a string of 0's that's equal to the length of difficulty
		while (
			this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
		) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("Block mined " + this.hash);
	}
}

class BlockChain {
	constructor() {
		// first block of the chain is called a genesis block: should be added manually
		this.chain = [this.createGenesisBlock()];
		// we can increase the difficulty by numer => result will be the amount of 0's at the start of our hash
		// the higher the amount the higher the difficulty level
		this.difficulty = 4;
	}
	// creation of our genesisblock (intialblock ever made => has to be done manually)
	createGenesisBlock() {
		return new Block(0, "11/01/18", "Genesis Block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		// function thath adds a new block: gets the previoushash => initializes our miner => pushes new block to chain
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid() {
		// function that checks our validation
		// start at 1 because 0 is our genesis block
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
			// check if the hash is equal to all the variables that are given.
			// if someone corrupts a block, the hashes will not be the same and in reponse our chain will report its corrupted
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			// same logic as statement displayed above
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
			// if all checks are true, chain is valid, return true.
			return true;
		}
	}
}

let coin = new BlockChain();

console.log("mining block 1...");
coin.addBlock(
	new Block(1, "10/01/2018", {
		dataSetSize: 214000,
		nummer: 5,
		createdBy: "Transavia"
	})
);
console.log("mining block 2...");
coin.addBlock(
	new Block(2, "11/01/2018", {
		dataSetSize: 521000,
		nummer: 1,
		createdBy: "Lufthansa"
	})
);

console.log(JSON.stringify(coin, null, 4));
console.log("is my chain valid?", coin.isChainValid());
// here we expose tempering with the block resulting in a false to the question: is my chain valid
coin.chain[1].data = {
	dataSetSize: 600000,
	nummer: 5,
	createdBy: "KLM"
};
console.log("is my chain valid?", coin.isChainValid());
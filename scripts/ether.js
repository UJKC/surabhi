const { ethers } = require("ethers");

// Setup Ganache provider
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Replace with one of Ganache's pre-funded private keys
const senderPrivateKey = "0xYOUR_SENDER_PRIVATE_KEY"; // Account 0's private key
const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

// Replace with the receiver's address (your contract deployment account)
const receiverAddress = "0x25D3459d6cd783E0C94606602EB55aDf86C29929";  // Your target account

async function sendFunds() {
  const amount = ethers.parseEther("10.0"); // Send 10 ETH

  const tx = {
    to: receiverAddress,
    value: amount
  };

  const txResponse = await senderWallet.sendTransaction(tx);
  console.log(`Transaction hash: ${txResponse.hash}`);
  
  // Wait for the transaction to be mined
  const receipt = await txResponse.wait();
  console.log(`Transaction mined in block ${receipt.blockNumber}`);
}

sendFunds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

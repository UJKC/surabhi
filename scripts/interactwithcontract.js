const { ethers } = require("ethers");

async function main() {
  // Connect to the Ganache provider
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Your account private key from Ganache
  const privateKey = "0x294b26ffd0d3f08dfbc57dfa3582dcc7241bbce7c6c556adbb2d88cc2373c4b4"; // Replace with your account private key

  // Create wallet instance with the private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // The address of the deployed contract
  const contractAddress = "0x55B3B8BaCf3094Cd5Ba55D1E859A1b29c833Df5f";

  // The ABI of the SimpleStorage contract
  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Create a contract instance connected to the wallet
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Set a new value in the contract
  const tx = await contract.set(200);
  console.log(`Transaction hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log(`Transaction mined in block: ${receipt.blockNumber}`);

  // Check the new stored value
  const newStoredValue = await contract.get();
  console.log(`New stored value is: ${newStoredValue.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

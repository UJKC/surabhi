const { ethers } = require("ethers");

async function main() {
  // Connect to the Ganache provider
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Your account private key from Ganache
  const privateKey = "0xfb74137c1a12499b04bdbff9d7d121b0e35c20127d4a6f8a2e29d1f39792ad57"; // Replace with your account private key

  // Create wallet instance with the private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // The address of the deployed contract
  const contractAddress = "0xE8FCbFb51C891E7ccF3C343DdFB88E390867ef6C";

  // The ABI of the SimpleStorage contract
  const abi = [
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
    },
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
      "name": "storedData",
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

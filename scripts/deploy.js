// deploy.js

const { ethers } = require("ethers");

async function main() {
  // Connect to local Ganache provider
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  
  // Get the signer (deployer account) from Ganache
  const [deployer] = await provider.listAccounts();  // Ganache returns a list of accounts
  
  console.log("Deploying contracts with the account:", deployer);
  
  // Compile the contract (SimpleStorage) and get the contract factory
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

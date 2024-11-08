const { ethers } = require("ethers");

async function checkBalance() {
  // The address you want to check
  const address = "0xE8FCbFb51C891E7ccF3C343DdFB88E390867ef6C";
  
  // Connect to the local Ganache instance (Ganache usually runs on localhost:8545)
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');  // Local Ganache RPC URL
  
  // Fetch the balance of the address
  const balance = await provider.getBalance(address);
  
  // Output the balance in Ether (Ganache returns balances in Wei)
  console.log(ethers.utils.formatEther(balance));  // Converts Wei to Ether
}

checkBalance().catch(console.error);

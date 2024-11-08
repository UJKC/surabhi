const { ethers } = require("ethers");

async function main() {
  // Connect to the Ganache provider
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Example: Get the latest block number
  const blockNumber = await provider.getBlockNumber();
  console.log("Latest block number:", blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
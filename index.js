// server.js

const express = require("express");
const { ethers } = require("ethers");

const app = express();
const port = 3000; // Port to run the server

// Define the provider (assuming Ganache is running on localhost:8545)
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Endpoint to fetch balance
app.get("/balance", async (req, res) => {
  const address = req.query.address; // Get the address from the query parameter

  // If no address is provided, return a 400 error
  if (!address) {
    return res.status(400).send("Address query parameter is required");
  }

  try {
    // Fetch balance from Ethereum network (Ganache in this case)
    const balance = await provider.getBalance(address);

    // Return the balance in Ether format
    const formattedBalance = ethers.utils.formatEther(balance);
    res.json({
      address: address,
      balance: formattedBalance,
      unit: "ETH"
    });
  } catch (error) {
    // If an error occurs (e.g., invalid address), send a 500 error
    console.error(error);
    res.status(500).send("Error fetching balance");
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

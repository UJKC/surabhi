const express = require("express");
const cors = require("cors"); // Add CORS middleware
const { ethers } = require("hardhat");
const app = express();
const port = 3000;

// Enable CORS for all origins (you can configure it to allow only specific domains)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to the Ganache provider
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// Your account private key from Ganache
const privateKey = "0xfb74137c1a12499b04bdbff9d7d121b0e35c20127d4a6f8a2e29d1f39792ad57"; // Replace with your account private key

// Create wallet instance with the private key
const wallet = new ethers.Wallet(privateKey, provider);

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

// The address for deployment, leave blank initially
let contractAddress = "";

// POST endpoint for deploying the contract
app.post("/deploy", async (req, res) => {
  try {
    // Compile the SimpleStorage contract (Assuming it's already compiled)
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage", wallet);

    // Deploy the contract
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();

    contractAddress = simpleStorage.address;

    res.json({
      message: "Contract deployed successfully!",
      contractAddress: simpleStorage.address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deploying contract" });
  }
});

// GET endpoint to check stored value after deployment
app.get("/getStoredValue", async (req, res) => {
  try {
    if (!contractAddress) {
      return res.status(400).json({ error: "Contract not deployed yet" });
    }

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Get the stored value from the contract
    const storedValue = await contract.get();
    res.json({
      storedValue: storedValue.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting stored value" });
  }
});

// POST endpoint to set a new value in the contract
app.post("/setValue", async (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "Value not provided" });
  }

  try {
    if (!contractAddress) {
      return res.status(400).json({ error: "Contract not deployed yet" });
    }

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Set the value in the contract
    const tx = await contract.set(value);
    console.log(`Transaction hash: ${tx.hash}`);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(`Transaction mined in block: ${receipt.blockNumber}`);

    res.json({
      message: "Value set successfully!",
      transactionHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error setting value" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

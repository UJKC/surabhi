async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Interacting with the contract using the account:", deployer.address);
  
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
  
    // Set a value
    const setTx = await simpleStorage.set(42);
    await setTx.wait();
    console.log("Value set to 42");
  
    // Get the value
    const value = await simpleStorage.get();
    console.log("Stored value is:", value.toString());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
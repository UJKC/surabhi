async function checkBalance(address) {
    const balance = await provider.getBalance(address);
    console.log(`Balance of ${address}: ${ethers.formatEther(balance)} ETH`);
  }
  
  checkBalance("0x25D3459d6cd783E0C94606602EB55aDf86C29929");
  
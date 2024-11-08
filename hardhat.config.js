require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0",
  networks: {
    "Localhost 8545": {
      url: "http://127.0.0.1:8545",  // Ganache CLI URL
      accounts: ["0x294b26ffd0d3f08dfbc57dfa3582dcc7241bbce7c6c556adbb2d88cc2373c4b4"]  // Use one of your Ganache account private keys
    }
  }
};

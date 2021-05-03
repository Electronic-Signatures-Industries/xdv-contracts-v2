const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
module.exports = {
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
  plugins: ["truffle-contract-size"],
  networks: {
    bsctestnet: {
      provider: () => new HDWalletProvider(process.env.BSC_MNEMONIC, process.env.BSC_TESTNET),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: false
    },
    bsc: {
      provider: () => new HDWalletProvider(process.env.BSCMAINNET_MNEMONIC, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: false
    },
    localhost: {
      from: '0xDf010F43BC13EFc69CA56f3FB0D654Cf98B9310e',
      host: 'localhost',
      port: 8545,
      network_id: '10' // Match any network id
    },
    development: {
<<<<<<< Updated upstream
      from: '0xDf010F43BC13EFc69CA56f3FB0D654Cf98B9310e',
      host: 'localhost' ,
      port: 8545,
      network_id: '*' // Match any network id
=======
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "10", // Any network (default: none)
>>>>>>> Stashed changes
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(process.env.BSC_MNEMONIC, process.env.URL),
      from: '0x713745d54Ff324CF9C48d7f37b3819BB54006f3c',
      network_id: 4,
      gas: 7000000,
      gasPrice: 30000000000
    },
    
    kovan: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, process.env.URL),
      network_id: 42,
      gas: 7000000,
      gasPrice: 30000000000
    },

<<<<<<< Updated upstream
    ropsten: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, process.env.URL),
      network_id: 3,
      gas: 5000000,
     // timeoutBlocks: 3,
      gasPrice:  65000000000
    }
  }
};
=======
  db: {
    enabled: false,
  },

  plugins: ["truffle-plugin-dist"],

  schema: {
    XDVToken: {
      abi: true,
      addresses: true,
      byteCodeHash: true,
    },
  },
};
>>>>>>> Stashed changes

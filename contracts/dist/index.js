// updated at: 2021-04-30T17:57:54.290Z

/* eslint-disable */

const data = require('./data');

const ContractNames = {
  XDVToken: 'XDVToken',
};

function getContractAddress(contractName, networkId = 1) {
  let result;

  if (data[contractName]) {
    result = data[contractName].addresses[`${networkId}`];
  }

  return result || null;
}

function getContractAbiDefinition(contractName) {
  let result;

  if (data[contractName]) {
    result = data[contractName].abi;
  }

  return result || null;
}

function getContractByteCodeHash(contractName) {
  let result;

  if (data[contractName]) {
    result = data[contractName].byteCodeHash;
  }

  return result || null;
}

module.exports = {
  ContractNames,
  getContractAddress,
  getContractAbiDefinition,
  getContractByteCodeHash,
};

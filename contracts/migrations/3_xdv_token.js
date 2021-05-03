const MockCoin = artifacts.require("MockCoin");
const XDVToken = artifacts.require("XDVToken");

async function usdcAddress(network) {
  switch (network) {
    case "development":
    case "test":
    default:
      const coinContract = await MockCoin.deployed();
      return coinContract.address;

    //default:
      // BUSD Binance Smart Chain testnet
      //return "0x0161ae441aac490269db3cfb5fd4b9e1e5cce836";
  }
}

module.exports = async (deployer, network, accounts) => {
  let coinAddress = await usdcAddress(network);
  console.log(coinAddress, accounts);
  await deployer.deploy(XDVToken, coinAddress, accounts[0]);

  // Setup default shares
  const datatoken = await XDVToken.deployed();
  await Promise.all([
    datatoken.setServiceFeeForContract(web3.utils.toWei("0.1")),
    datatoken.setServiceFeeForPaymentAddress(web3.utils.toWei("0.9")),
  ]);
};

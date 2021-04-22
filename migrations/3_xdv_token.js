const MockCoin = artifacts.require("MockCoin");
const XDVToken = artifacts.require("XDVToken");
const XDVController = artifacts.require("XDVController");

async function usdcAddress(network) {
  switch (network) {
    case "development":
      const coinContract = await MockCoin.deployed();
      return coinContract.address;

    default:
      // USDC Rinkeby Network
      return "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
  }
}

module.exports = async (deployer, network, accounts) => {
  let coinAddress = await usdcAddress(network);

  await deployer.deploy(
    XDVToken,
    "XDV Document Token v2",
    "XDV2",
    coinAddress,
    accounts[0]
  );

  // Setup default shares
  const datatoken = await XDVToken.deployed();
  await Promise.all([
    datatoken.setServiceFeeForContract(web3.utils.toWei("0.1")),
    datatoken.setServiceFeeForPaymentAddress(web3.utils.toWei("0.9")),
  ]);

  await deployer.deploy(XDVController, coinAddress, datatoken.address);
};

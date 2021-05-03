const MockCoin = artifacts.require("MockCoin");

module.exports = async (deployer, network, accounts) => {
  // if (network == "development" || network == "test") {
    await deployer.deploy(MockCoin);
  //}
};

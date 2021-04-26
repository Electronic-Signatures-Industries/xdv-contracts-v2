const Bluebird = require("bluebird");
const MockCoin = artifacts.require("MockCoin");
const XDVToken = artifacts.require("XDVToken");

// This script is a copy of the "Golden Path" test
async function script() {
  const accounts = await web3.eth.getAccounts();

  const accountNotary = accounts[0];
  const accountDataProvider = accounts[1];
  const accountTokenOwner = accounts[2];

  const [erc20Contract, xdvContract] = await Bluebird.all([
    MockCoin.deployed(),
    XDVToken.deployed(),
  ]);

  // Starting Document
  const documentResult = await xdvContract.requestDataProviderService(
    "did:test:1",
    accountDataProvider,
    `did:eth:${accountNotary}`,
    "ipfs://test",
    "Lorem Ipsum",
  );
  const requestId = documentResult.receipt.logs[0].args.id;

  // Mint the token
  const mintResult = await xdvContract.mint(
    requestId,
    accountTokenOwner,
    accountNotary,
    "ipfs://test2",
  );

  const { tokenId } = mintResult.logs.find((e) => e.event === "Transfer").args;
  console.log(`Token Minted. ID: ${tokenId.toString()}`);

  // Mint erc20s and approve transfer of them
  await Bluebird.all([
    erc20Contract.mint(accountTokenOwner, web3.utils.toWei("200")),
    erc20Contract.approve(xdvContract.address, web3.utils.unitMap.tether, {
      from: accountTokenOwner,
    }),
  ]);

  // Burn the token
  const result2 = await xdvContract.burn(tokenId, {
    from: accountTokenOwner,
  });
  const event = result2.logs.find((e) => e.event === "ServiceFeePaid");
  console.log("Token Burned. ID: " + event.args.tokenId.toString());
}

module.exports = (callback) => {
  script().then(callback);
};

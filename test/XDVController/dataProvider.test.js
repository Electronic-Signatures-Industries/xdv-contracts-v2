const { assert } = require("chai");
const XDVToken = artifacts.require("XDVToken");

contract("XDVController: registerMinter()", (accounts) => {
  const accountDataProvider = accounts[1];
  let xdvContract;

  before(async () => {
    xdvContract = await XDVToken.deployed();
  });

  it("should create a new minter", async () => {
    const res = await xdvContract.registerMinter(
      "NOTARIO 9VNO - APOSTILLADO",
      "0x0a2Cd4F28357D59e9ff26B1683715201Ea53Cc3b",
      false,
      web3.utils.toWei("20"),
      {
        from: accountDataProvider,
      }
    );

    const documentMinterAddress = res.logs[0].args.minter;
    assert.strictEqual(documentMinterAddress, accountDataProvider);
  });
});

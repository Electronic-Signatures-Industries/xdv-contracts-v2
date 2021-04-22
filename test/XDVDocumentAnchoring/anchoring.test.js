const { assert } = require("chai");
const XDVDocumentAnchoring = artifacts.require("XDVDocumentAnchoring");

contract("XDVDocumentAnchoring", (accounts) => {
  let documents;

  before(async () => {
    documents = await XDVDocumentAnchoring.deployed();
  });

  it("should add a new Document", async () => {
    const userDID = "user DID";
    const res = await documents.addDocument(
      userDID,
      "document URI",
      "any description"
    );

    const _id = res.logs[0].args.id.toString();
    const xdvDocAnchoring = await documents.minterDocumentAnchors(
      accounts[0],
      _id
    );

    assert.equal(await xdvDocAnchoring.user, accounts[0]);
    assert.equal(await xdvDocAnchoring.userDid, userDID);
  });
});

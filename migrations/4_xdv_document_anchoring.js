const XDVDocumentAnchoring = artifacts.require("XDVDocumentAnchoring");

module.exports = async (deployer, network, accounts) => {
  let daiaddress = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3";
  await deployer.deploy(XDVDocumentAnchoring, daiaddress);
};

const MinimalERC721 = artifacts.require("MinimalERC721");

module.exports = function (deployer) {
  deployer.deploy(MinimalERC721);
};

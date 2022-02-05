// migrations/3_deploy_upgradeable_box.js
const { deployProxy } = require("@openzeppelin/truffle-upgrades");

const Asset = artifacts.require("Asset");

module.exports = async function (deployer) {
  await deployProxy(Asset, [], { deployer, initializer: "initialize" });
};

module.exports = async function main(callback) {
  try {
    // Retrieve accounts from the local node
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const Asset = artifacts.require("Asset");
    const asset = await Asset.deployed();
    // Send a transaction to store() a new value in the asset
    await asset.mintAsset(
      "http://localhost:8080/ipfs/QmdxgWQMCq4D1ck7qyJvM1gxjnGsuz5FyuCmcZyiMUkTME"
    );

    // Get address of deployed contract
    const address = await asset.address;
    console.log(`Address: ${address}`);

    // Get Token of deployed contract

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
};

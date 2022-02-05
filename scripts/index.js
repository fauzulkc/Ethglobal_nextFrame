module.exports = async function main(callback) {
  try {
    // Retrieve accounts from the local node
    const accounts = await web3.eth.getAccounts();
    const Asset = artifacts.require("Asset");
    const asset = await Asset.deployed();
    // Send a transaction to store() a new value in the asset
    await asset.store(23);

    // Call the retrieve() function of the deployed asset contract
    const value = await asset.retrieve();
    console.log("asset value is", value.toString());

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
};

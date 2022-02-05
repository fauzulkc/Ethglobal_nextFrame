require("dotenv").config();
const API_URL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.alchemyPolygon}`;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../build/contracts/Asset.json");
console.log(JSON.stringify(contract.abi));

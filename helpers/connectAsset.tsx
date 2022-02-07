import web3 from "../helpers/web3";

import Asset from "../build/contracts/Asset.json";

const asset = new web3.eth.Contract(
  Asset.abi as any,
  "0x1b31b1B060AC71620ceC76c22154E42bEE6d4818"
);

export default asset;

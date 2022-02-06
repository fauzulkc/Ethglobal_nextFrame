import Web3 from "web3";

let web3: Web3;

// @ts-ignore
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metamask is running.
  // @ts-ignore
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(`${process.env.PROVIDER}`);
  web3 = new Web3(provider);
}

export default web3;

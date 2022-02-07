import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import web3 from "../helpers/web3";
import asset from "../helpers/connectAsset";

import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home: NextPage = () => {
  const [from, setFrom] = useState("");
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState<any>("");
  const [tokenName, setTokenName] = useState("");
  const [allAssets, setAllAssets] = useState<any>([{} as any]);
  const [IPFS, setIPFS] = useState<any>("");
  const [compose, setCompose] = useState<any>([] as any);

  const addToCompose = (id: number) => {
    const nonDuplicateCompose = new Set(compose).add(id);
    setCompose(Array.from(nonDuplicateCompose));
  };

  const mint = async (uri: string) => {
    try {
      await asset.methods.mintAsset(uri).send({
        from: from,
      });
      setTokenName(await asset.methods.name().call());
      const balance = await asset.methods.balanceOf(from).call();
      setBalance(balance);
    } catch (err) {
      setError(err);
      const balance = await asset.methods.balanceOf(from).call();
      setBalance(balance | 0);
    }
  };

  const getAllAssets = async () => {
    const totalAssets = await asset.methods.getTotalAssets().call();
    const AssetsData = [];
    for (let i = 0; i < totalAssets; i++) {
      const tokenUri = await asset.methods.tokenURI(i + 1).call();
      const tokenMeta = await fetchAssetMeta(tokenUri);
      const ownedBy = await asset.methods.ownerOf(i + 1).call();
      AssetsData.push({ tokenMeta, ownedBy, tokenId: i + 1 });
    }
    setAllAssets(AssetsData);
  };

  const fetchAssetMeta = async (uri: string) => {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    (async () => {
      const accounts = await web3.eth.getAccounts();
      setFrom(accounts[0]);
      try {
        const balance = await asset.methods.balanceOf(accounts[0]).call();
        setBalance(balance);
        getAllAssets();
      } catch (err) {
        setBalance(balance | 0);
      }
    })();
  }, []);

  useEffect(() => {
    getAllAssets();
  }, [allAssets]);

  return (
    <div>
      <Head>
        <title>NextFrame</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-end gap-4">
          <input
            className="flex-1 px-4 py-2 bg-white border border-gray-400 rounded-md"
            type="text"
            placeholder="only IPFS / PINATA JSON LINKS. Example: https://gateway.pinata.cloud/ipfs/{YOUR_TOKEN}.json"
            onChange={(e) => setIPFS(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => mint(IPFS)}
          >
            {tokenName !== "" ? tokenName : "Mint New IPFS"}
          </button>
        </div>
        <div className="flex gap-4">
          <div className="w-1/6 flex flex-col">
            <h1 className="text-2xl">Added For Composition: </h1>
            {compose.map((id: any) => {
              return (
                <div key={id} className="flex justify-start text-black text-lg">
                  Token -{" "}
                  <span className="py-1 px-2 bg-pink-300 m-1">{id}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {allAssets.map((assetData: any, index: number) => {
              return (
                <div key={index}>
                  <Card
                    {...assetData.tokenMeta}
                    tokenId={assetData.tokenId}
                    ownedBy={assetData.ownedBy}
                    clickEvent={addToCompose}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

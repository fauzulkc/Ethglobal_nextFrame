/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import { Fragment, useEffect, useState } from "react";
import web3 from "../../helpers/web3";
import asset from "../../helpers/connectAsset";
import Card from "../../components/Card";

const MyAssets = () => {
  const [ownedToken, setOwnedToken] = useState([]);
  const [ownedTokenURIs, setOwnedTokenURIs] = useState<any>([]);

  const getOwnedTokens = async () => {
    const ownedToken = await asset.methods.getOwnedTokens().call();
    setOwnedToken(ownedToken);
  };

  const getOwnedTokensURIs = async () => {
    const ownedTokenURIs = await asset.methods.getOwnedTokensURIs().call();
    const fetchedMetadata = await Promise.all(
      ownedTokenURIs.map((tokenUri: string) => {
        return fetch(tokenUri)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return data;
          });
      })
    ).catch((err) => {
      console.log(err);
    });
    setOwnedTokenURIs(fetchedMetadata);
  };

  useEffect(() => {
    (async () => {
      const accounts = await web3.eth.getAccounts();
      getOwnedTokens();
      getOwnedTokensURIs();
    })();
  }, []);
  return (
    <Layout>
      <h1 className="text-lg px-6 py-4 bg-orange-200 text-orange-900 border-orange-900 rounded-md">
        {ownedToken.map((token) => {
          return (
            <span className="px-1" key={token}>
              {token}
            </span>
          );
        })}
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {ownedTokenURIs.map(
          ({ name, description, image }: any, index: number) => {
            return (
              <Fragment key={name + index}>
                <Card image={image} description={description} name={name} />
              </Fragment>
            );
          }
        )}
      </div>
    </Layout>
  );
};

export default MyAssets;

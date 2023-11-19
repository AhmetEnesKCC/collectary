import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers, Signer } from "ethers";
import { setAccount } from "../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";

import { Alchemy, Network } from "alchemy-sdk";
import { setRooms } from "../redux/roomsSlice";

// Ağları tanımlayın
const networks = [
  Network.ETH_MAINNET,
  Network.MATIC_MAINNET,
  Network.BASE_MAINNET,
];

// const networks = [
//   Network.ETH_SEPOLIA,
//   Network.ARB_GOERLI,
//   Network.BASE_GOERLI,
//   Network.MATIC_MUMBAI,
//   Network.OPT_GOERLI,
// ];

const getNftsForOwnerOnNetwork = async (alchemy, ownerAddress) => {
  try {
    return await alchemy.nft.getNftsForOwner(ownerAddress);
  } catch (error) {
    console.error("Hata:", error);
    return null;
  }
};

const usePush = () => {
  const signer = useSigner();
  const account = useSelector((state: any) => state.account);

  const dispatch = useDispatch();

  //   const ownerAddress = "0xcDA86eAbE89B4B7D46c0a147dc206ACbA4Fd900B";

  const getNftOfUser = async (address: string) => {
    const allNfts: { network: Network; nfts: any }[] = [];
    for (const network of networks) {
      const config = {
        apiKey: "YDp3bhuqjsAB9P1RpOaFZMoCoRTtyLcB",
        network: network,
      };

      const alchemy = new Alchemy(config);
      const nfts = await getNftsForOwnerOnNetwork(alchemy, address);
      if (nfts && nfts.ownedNfts) {
        allNfts.push({
          network: network,
          nfts: nfts.ownedNfts,
        });
      }
    }
    const nftContainChains = allNfts
      .filter((nft) => nft.nfts.length > 0)
      .map((nft) => nft.nfts)
      .flat();
    const nftContractAddresses = Array.from(
      new Set(nftContainChains.map((nft) => nft.contract.address))
    );
    const nftContractAddressesWithNFTS: any = nftContractAddresses
      .map((address) => {
        const nfts = nftContainChains.filter(
          (nft) => nft.contract.address === address && nft.collection
        );
        return {
          nfts: nfts,
          // image: nfts[0].image.originalUrl,
          // name: nfts[0].collection.name,
          address: address,
        };
      })
      .filter((nft) => nft.nfts.length > 0)
      .map((nft) => ({
        ...nft,
        image: nft.nfts[0].image.originalUrl,
        name: nft.nfts[0].collection.name,
      }));
    return nftContractAddressesWithNFTS;
  };

  const initialize = async () => {
    const user = await PushAPI.initialize(signer as any, {
      env: CONSTANTS.ENV.STAGING,
    });
    dispatch(setAccount(user));
    return user;
  };
  const createStream = async (onMessage) => {
    console.log(account);
    try {
      const user = account;
      const stream = await user.initStream([CONSTANTS.STREAM.CHAT]);
      // Configure stream listen events and what to do

      stream.on(CONSTANTS.STREAM.CHAT, (message) => {
        onMessage(message);
      });
      // Connect Stream
      stream.connect();
      return stream;
    } catch (err) {
      console.log(err);
    }
  };
  return { initialize, createStream, getNftOfUser };
};

export default usePush;

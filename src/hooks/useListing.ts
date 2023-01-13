import { useMarketplace } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import abiNftCollection from "../abis/abiNftCollection.json";

export const useListing = () => {
  const marketplace = useMarketplace(
    "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a" // Your marketplace contract address here
  );
  const nftData = useSelector((state: any) => state.NftData.value);

  const fetchTokenData = async (tokenId: number) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );

    const contract = new ethers.Contract(
      "0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD",
      abiNftCollection,
      provider
    );

    const getMetadata = async (tokenId) => {
      const tokenMetadata = await contract?.tokenURI(tokenId)
      const organizedMetadata = tokenMetadata.startsWith("ipfs://")
        ? tokenMetadata.replace("ipfs://", "https://ipfs.io/ipfs/")
        : tokenMetadata;

      console.log(organizedMetadata)
      const tokenMetadataJson = await fetch(organizedMetadata);
      const ourObj = await tokenMetadataJson.json();
      
      return ourObj;
      // return tokenMetadata;
    };

    const getTokenOwner = async (tokenId) => {
      const ownerAddress = await contract?.ownerOf(tokenId);
      // const owner = await fetch(tokenFunction);
      // const ownerAddress = owner?.url?.toString().slice(-42);
      
      return ownerAddress;
    };

    const tokenMetadata = await contract?.tokenURI(tokenId);
    const tokenOwner = await contract?.ownerOf(tokenId);

    const organizedMetadata = tokenMetadata.startsWith("ipfs://")
      ? tokenMetadata.replace("ipfs://", "https://ipfs.io/ipfs/")
      : tokenMetadata;

      const metaDataFunc = await getMetadata(tokenId);
      const tokenOwnerFromFunc = await getTokenOwner(tokenId);
      console.log(metaDataFunc,tokenOwnerFromFunc,tokenMetadata)
      
      const metadata = { tokenOwner: tokenOwner, tokenMetadata: metaDataFunc };
    return metadata;
  };

  const createDirectListing = async (
    contractAddress: string,
    tokenId: string,
    price: string
  ) => {
    try {
      const transaction = await marketplace?.direct.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  };
  const createAuctionListing = async (
    contractAddress: string,
    tokenId: string,
    price: string
  ) => {
    try {
      const transaction = await marketplace?.auction.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    createDirectListing,
    createAuctionListing,
    fetchTokenData,
  };
};

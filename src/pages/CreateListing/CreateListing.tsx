import { Verified } from "@mui/icons-material";
import {
  useAddress,
  useContract,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [selectedListing, setSelectedListing] = useState<number | undefined>();
  const [allOwnedNfts, setAllOwnedNfts] = useState([]);
  const [marketplaceStatus, setMarketplaceStatus] = useState([]);
  const [sellNft, setSellNft] = useState();

  const address = useAddress();
  const networkMismatch = useNetworkMismatch();

  const marketplaceContract = useContract(
    "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    "marketplace"
  );

  const {
    contract: nftCollectionContract,
    isLoading,
    error,
  } = useContract(
    "0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD",
    "nft-collection"
  );

  const getAllNfts = async () => {
    const marketplace =
      await marketplaceContract?.contract?.getActiveListings();
    const nfts = await nftCollectionContract?.getOwned(address);
    setAllOwnedNfts(nfts);
    setMarketplaceStatus(marketplace);
    console.log(nfts, marketplace);
  };

  useMemo(() => {
    getAllNfts();
  }, [nftCollectionContract, address]);

  const [, switchNetwork] = useNetwork();
  const navigate = useNavigate();

  const handleCreateListing = async (e: any) => {
    const { listingType, price } = e.target.elements;
    e.preventDefault();
    try {
      if (networkMismatch) {
        switchNetwork && switchNetwork(80001);
        return;
      }

      let transactionResult = undefined;

      const { listingType, price } = e.target.elements;
      console.log(listingType.value, price.value);

      if (listingType.value === "directListing") {
        transactionResult = await createDirectListing(
          "0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD",
          sellNft,
          price.value
        );
      }

      if (listingType.value === "auctionListing") {
        transactionResult = await createAuctionListing(
          "0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD",
          sellNft,
          price.value
        );
      }

      if (transactionResult) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createDirectListing = async (
    contractAddress: string,
    tokenId: number,
    price: string
  ) => {
    const listing = {
      assetContractAddress: contractAddress,
      tokenId: tokenId,
      startTimestamp: new Date(),
      listingDurationInSeconds: 86400 * 6,
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: price,
    };

    try {
      const tx = await marketplaceContract?.contract?.direct?.createListing(
        listing
      );
      const receipt = tx.receipt; // the transaction receipt
      const listingId = tx.id; // the id of the newly created listing

      // And on the buyers side:
      // Quantity of the asset you want to buy
      const quantityDesired = 1;
      await marketplaceContract?.contract.direct.buyoutListing(
        listingId,
        quantityDesired
      );
      console.log(tx);
      return tx;
    } catch (error) {
      console.error(error);
    }
  };
  const createAuctionListing = async (contractAddress, tokenId, price) => {
    try {
      const auction = {
        assetContractAddress: contractAddress,
        tokenId: tokenId,
        startTimestamp: new Date(),
        listingDurationInSeconds: 86400 * 6,
        quantity: 1,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        buyoutPricePerToken: price,
        reservePricePerToken: "0.0000009",
      };

      const tx = await marketplaceContract?.contract?.auction?.createListing(
        auction
      );
      const receipt = tx.receipt;
      const listingId = tx.id;

      // And on the buyers side:
      // The price you are willing to bid for a single token of the listing
      const pricePerToken = 0.002;
      await marketplaceContract?.contract.auction.makeBid(
        listingId,
        pricePerToken
      );
    } catch (error) {
      console.error(error);
    }
  };

  const organizedUri = (uri) => {
    const formattedUri = uri.startsWith("ipfs://")
      ? uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      : uri;
    return formattedUri;
  };
  return (
    <section className="bg-gray-100">
      <div className="p-10 flex flex-wrap gap-4">
        {allOwnedNfts?.map((ownedNfts) => {
          const isAlreadyListed = !!marketplaceStatus.find(
            (nft) => nft.asset.id === ownedNfts?.metadata?.id
          );

          return (
            <div
              className="w-[21rem] h-[21rem] cursor-pointer  "
              onClick={() => !isAlreadyListed && setSellNft(ownedNfts?.metadata?.id)}
            >
              <div className="flex flex-col   items-center justify-center w-full max-w-sm mx-auto">
                <div
                  className={`${
                    ownedNfts.metadata.uri === "" ||
                    (ownedNfts.metadata.uri === undefined && "animate-pulse")
                  } object-cover w-full bg-gray-300 bg-center bg-cover rounded-lg shadow-md   h-64 `}
                  // className="w-full bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                  // style={{
                  //   backgroundImage: `url(${
                  //     organizedUri(ownedNfts?.metadata?.uri)
                  //   })`,
                  // }}
                >
                  <img
                    className="object-cover h-64 w-full"
                    src={
                      ownedNfts?.metadata?.image
                        ? ownedNfts?.metadata?.image
                        : organizedUri(ownedNfts?.metadata?.uri)
                    }
                    alt=""
                  />
                </div>

                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide   text-overflow-ellipsis text-center text-gray-800 uppercase dark:text-white">
                    {ownedNfts?.owner?.slice(0, 6)}...
                    {ownedNfts?.owner?.slice(-6)}
                  </h3>

                  <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold flex items-center text-gray-800 dark:text-gray-200">
                      <span className="mr-2">{ownedNfts?.metadata?.id}</span>

                      {sellNft === ownedNfts?.metadata?.id && (
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          <Verified
                            sx={{
                              fontSize: "16px",
                              textAlign: "center",
                              verticalAlign: "center",
                            }}
                          />
                        </span>
                      )}
                    </span>
                    <button
                      className={`px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform ${isAlreadyListed?"bg-red-800" :"bg-gray-800"} rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none`}
                    >
                      {isAlreadyListed ? "Listed " : "List"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              To Create nft listing, use token collection contract with its
              token id, mention the type of listing you want and also sale price
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form
              className="space-y-4"
              onSubmit={(e) => handleCreateListing(e)}
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  Listing Type
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div className="hidden">
                  <input
                    type="radio"
                    name="listingType"
                    id="directListing"
                    value="directListing"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="listingType"
                    id="auctionListing"
                    value="auctionListing"
                  />
                </div>
                <div onClick={() => setSelectedListing(0)}>
                  <label
                    htmlFor="directListing"
                    className={`block w-full rounded-lg cursor-pointer  outline-none border-[1px] ${
                      selectedListing === 0
                        ? "border-purple-600"
                        : "border-gray-200"
                    } p-3`}
                    tabIndex={0}
                  >
                    <span className="text-sm font-medium">Direct Listing </span>
                  </label>
                </div>

                <div onClick={() => setSelectedListing(1)}>
                  <label
                    htmlFor="auctionListing"
                    className={`block w-full  rounded-lg  outline-none border-[1px] ${
                      selectedListing === 1
                        ? "border-purple-600"
                        : "border-gray-200"
                    } p-3`}
                    tabIndex={0}
                  >
                    <span className="text-sm font-medium">Auction</span>
                  </label>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                <label className="sr-only" htmlFor="email">
                NFT Contract Address
                </label>
                <input
                className="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                placeholder="NFT Contract Address"
                type="text"
                id="contractAddress"
                name="contractAddress"
                />
                </div>
                
                <div>
                <label className="sr-only" htmlFor="phone">
                Token ID
                </label>
                <input
                className="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                placeholder="NFT Token Id"
                type="text"
                id="tokenId"
                name="tokenId"
                />
                </div>
              </div> */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Sale Price
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                    placeholder="Sale Price"
                    type="text"
                    id="salePrice"
                    name="price"
                  />
                </div>
                {/* <div>
                  <label className="sr-only" htmlFor="email">
                    Deadline
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                    placeholder="Deadline"
                    type="text"
                    id="auctionEndsIn"
                    name="auctionEndsIn"
                  />
                </div> */}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className={`inline-flex w-full  ${
                    sellNft === undefined &&
                    selectedListing === undefined &&
                    "cursor-not-allowed"
                  } items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto`}
                >
                  <span className="font-medium"> Create Listing </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateListing;

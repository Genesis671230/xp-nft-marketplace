import { BigNumber, ethers } from "ethers";
import { useMemo, useState } from "react";
import marketplaceAbi from "../../abis/abiPolygonMarketplace.json";
import { useListing } from "../../hooks/useListing";
import {
  ConnectWallet,
  useActiveListings,
  useContract,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import {
  ChainId,
  NATIVE_TOKENS,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const [allListings, setAllListings] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const { fetchTokenData } = useListing();
  const [selectedListing, setSelectedListing] = useState(undefined);
  const marketplace = useMarketplace(
    "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    "marketplace"
  );
  const marketplaceContract = useContract(
    "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    "marketplace"
  );

  useMemo(async () => {
    const allActiveListings =
      await marketplaceContract?.contract?.getActiveListings();

    const activeListings = [];
    for (const listing of allActiveListings) {
      const offers = await marketplaceContract?.contract?.getOffers(listing.id);
      console.log(offers);

      const object = { ...listing, offers };
      activeListings.push(object);
    }

    setAllListings(activeListings);
  }, [marketplaceContract]);
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const { contract } = useContract(
    "0xa39BFbB28c25CE3A1CdEEc3D13754Fc5B8ddA116",
    "marketplace"
  );

  console.log(allListings);

  const navigate = useNavigate();

  // const getListings = async () => {
  //   try {
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       "https://rpc-mumbai.maticvigil.com/"
  //     );
  //     const contract = new ethers.Contract(
  //       "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
  //       marketplaceAbi,
  //       provider
  //     );
  //     const validParams = [
  //       "listingId",
  //       "tokenOwner",
  //       "assetContract",
  //       "tokenId",
  //       "startTime",
  //       "endTime",
  //       "quantity",
  //       "currency",
  //       "reservePricePerToken",
  //       "buyoutPricePerToken",
  //       "tokenType",
  //       "listingTyp",
  //     ];
  //     const allActiveListings =
  //       await marketplaceContract?.contract?.getActiveListings();

  //     const activeListingsWithOffers = allActiveListings.map(async (item) => {
  //       const offers = await marketplaceContract.contract.getOffers(item.id);
  //       console.log(offers);

  //       return { ...item, offers: offers };
  //     });
  //     setAllListings(activeListingsWithOffers);

  //     // const totalListingsBigNumber = await contract?.totalListings();
  //     // const totalListings = Number(totalListingsBigNumber)
  //     // console.log(allActiveListings);

  //     // const allListingsArray = [];

  //     // for (let i = 1; i <= allActiveListings?.length; i++) {
  //     //   const listings = await contract?.listings(i);
  //     //   const organizedData = Object.entries(listings)
  //     //     .filter((item) => validParams.includes(item[0]))
  //     //     .reduce((acc, item) => {
  //     //       if (item[0] === "startTime") {
  //     //         const startTime = Number(item[1]);
  //     //         const newData = new Date(startTime).getTime();
  //     //         acc[item[0]] = newData;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "endTime") {
  //     //         const endTime = Number(item[1]);
  //     //         const newData = new Date(endTime).getTime();
  //     //         acc[item[0]] = newData;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "listingId") {
  //     //         const listingId = Number(item[1]);

  //     //         acc[item[0]] = listingId;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "quantity") {
  //     //         const quantity = Number(item[1]);

  //     //         acc[item[0]] = quantity;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "reservePricePerToken") {
  //     //         const ether = ethers.utils.formatEther(item[1]);

  //     //         acc[item[0]] = ether;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "buyoutPricePerToken") {
  //     //         const ether = ethers.utils.formatEther(item[1]);

  //     //         acc[item[0]] = ether;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "tokenId") {
  //     //         const tokenId = Number(item[1]);

  //     //         acc[item[0]] = tokenId;
  //     //         return acc;
  //     //       }
  //     //       if (item[0] === "reservePricePerToken") {
  //     //         const ether = (item[1] / 10) * 18;

  //     //         acc[item[0]] = ether;
  //     //         return acc;
  //     //       }

  //     //       acc[item[0]] = item[1];
  //     //       return acc;
  //     //     }, {});

  //     //   const singleNftMetadata = await fetchTokenData(organizedData?.tokenId);
  //     //   console.log(singleNftMetadata,allListingsArray);
  //     //   allListingsArray.push({
  //     //     ...organizedData,
  //     //     nftMetadata: singleNftMetadata,
  //     //   });
  //     // }
  //     // setAllListings(allListingsArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createDirectListing = async (contractAddress, tokenId, price) => {
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://rpc-mumbai.maticvigil.com"
    // );
    // const signer = provider.getSigner();
    // const contractMarketplace = new ethers.Contract(
    //   "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    //   marketplaceAbi,
    //   signer
    // );

    // const ListingParameters = {
    //   assetContract: "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    //   tokenId: "0",
    //   startTime: new Date(),
    //   secondsUntilEndTime: 60 * 60 * 24 * 7,
    //   quantityToLis: 1,
    //   currencyToAccept: NATIVE_TOKEN_ADDRESS,
    //   reservePricePerToken: 1,
    //   buyoutPricePerToken: "0",
    //   listingType: 0,
    // };

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
      await contract.direct.buyoutListing(listingId, quantityDesired);
      console.log(tx);
      return tx;
    } catch (error) {
      console.error(error);
    }
  };
  const createAuctionListing = async (contractAddress, tokenId, price) => {
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://polygon-rpc.com"
    // );
    // const signer = provider.getSigner();
    // const contractMarketplace = new ethers.Contract(
    //   "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    //   marketplaceAbi,
    //   signer
    // );

    try {
      //   const transaction = await marketplace.createListing({
      //     assetContractAddress: contractAddress, // Contract Address of the NFT
      //     buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
      //     currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
      //     listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
      //     quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
      //     reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
      //     startTimestamp: new Date(), // When the listing will start
      //     tokenId: tokenId, // Token ID of the NFT.
      //   });
      //   console.log(transaction);

      //   return transaction;

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
      await contract.auction.makeBid(listingId, pricePerToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateListing = async (e) => {
    try {
      if (networkMismatch) {
        switchNetwork && switchNetwork(137);
        return;
      }

      e.preventDefault();

      let transactionResult = undefined;

      const { listingType, contractAddress, tokenId, price } =
        e.target.elements;

      if (listingType.value === "directListing") {
        transactionResult = await createDirectListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      if (listingType.value === "auctionListing") {
        transactionResult = await createAuctionListing(
          contractAddress.value,
          tokenId.value,
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

  const buyNft = async (listingId) => {
    if (marketplaceContract) {
      // Quantity of the asset you want to buy
      const quantityDesired = 1;
      console.log(await marketplaceContract);
      await marketplaceContract?.contract?.buyoutListing(
        listingId,
        quantityDesired
      );
    }
  };

  const makeOffer = async (listingId) => {
    // The quantity of tokens you want to receive for this offer

    await marketplaceContract.contract?.direct?.makeOffer(
      3,
      1,
      NATIVE_TOKENS[ChainId.Mumbai].wrapped.address,
      offerPrice
    );
  };
  const placeBid = async (listingId) => {
    await marketplaceContract?.contract?.auction?.makeBid(listingId, offerPrice);
  };
  return (
    <>
      <div className="bg-gray-100 ">
        <section class="bg-gray-100">
          <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div class="lg:col-span-2 lg:py-12">
                <p class="max-w-xl text-lg">
                  To Create nft listing, use token collection contract with its
                  token id, mention the type of listing you want and also sale
                  price
                </p>
              </div>

              <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <form
                  action=""
                  class="space-y-4"
                  onSubmit={(e) => handleCreateListing(e)}
                >
                  <div>
                    <label class="sr-only" for="name">
                      Listing Type
                    </label>
                  </div>

                  <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
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
                        for="directListing"
                        class={`block w-full rounded-lg cursor-pointer  outline-none border-[1px] ${
                          selectedListing === 0
                            ? "border-purple-600"
                            : "border-gray-200"
                        } p-3`}
                        tabindex="0"
                      >
                        <span class="text-sm font-medium">Direct Listing </span>
                      </label>
                    </div>

                    <div onClick={() => setSelectedListing(1)}>
                      <label
                        for="auctionListing"
                        class={`block w-full  rounded-lg  outline-none border-[1px] ${
                          selectedListing === 1
                            ? "border-purple-600"
                            : "border-gray-200"
                        } p-3`}
                        tabindex="0"
                      >
                        <span class="text-sm font-medium">Auction</span>
                      </label>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="sr-only" for="email">
                        NFT Contract Address
                      </label>
                      <input
                        class="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                        placeholder="NFT Contract Address"
                        type="text"
                        id="contractAddress"
                        name="contractAddress"
                      />
                    </div>

                    <div>
                      <label class="sr-only" for="phone">
                        Token ID
                      </label>
                      <input
                        class="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                        placeholder="NFT Token Id"
                        type="text"
                        id="tokenId"
                        name="tokenId"
                      />
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="sr-only" for="email">
                        Sale Price
                      </label>
                      <input
                        class="w-full rounded-lg border-gray-300 outline-none border-[1px] p-3 text-sm"
                        placeholder="Sale Price"
                        type="text"
                        id="salePrice"
                        name="price"
                      />
                    </div>
                  </div>

                  <div class="mt-4">
                    <button
                      type="submit"
                      class="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                    >
                      <span class="font-medium"> Create Listing </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-3 h-5 w-5"
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
      </div>

      <div className="p-10">
        <div className="text-[3rem]">All Listings</div>
        <div className="flex flex-wrap gap-10 mt-4">
          {allListings?.map((listing, index) => (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="overflow-hidden">
                <img
                  className="object-cover h-[20rem] w-[24rem]"
                  src={listing?.asset?.image}
                  alt="Shoes"
                />
              </figure>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between py-2">
                    <div>
                      <h2 className="text-xl font-bold">
                        <span>{listing?.asset?.name}</span>
                      </h2>
                    </div>
                    <div className="flex justify-between flex-col">
                      <div>
                        <h2 className="text-xl font-bold">
                          <span>Token ID</span>{" "}
                          <span>{listing?.asset?.id}</span>
                        </h2>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          <span>Lisiting Id</span> <span>{listing?.id}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono">{listing?.asset?.description}</p>
                  </div>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                      {listing?.nftMetadata?.name}
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                      {listing?.sellerAddress?.slice(0, 6)}...
                      {listing?.sellerAddress?.slice(-6)}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-600 text-[2rem] font-semibold  ">
                      All Offers
                    </div>
                    <div>
                      {listing?.offers.map((offer) => (
                        <div>
                          <div>
                            {" "}
                            {offer?.buyerAddress?.slice(0, 6)}...
                            {offer?.buyerAddress?.slice(-6)}
                          </div>
                          <div>{Number(offer?.quantityDesired)}</div>
                          <div>
                            {BigNumber.from(offer?.pricePerToken).toString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {listing.type === 0 && (
                    <div
                      className="flex justify-end "
                      onClick={() => buyNft(index + 1)}
                    >
                      <button className="px-4 py-2 bg-sky-600 font-bold rounded-lg shadow-lg text-white  ">
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-end flex-col">
                  <div className="mt-4">
                    <input
                      onChange={(e) => setOfferPrice(e.target.value)}
                      type="text"
                      className="outline-none rounded-sm border-[1px] border-slate-300 w-full"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (listing.type === 0) {
                        makeOffer(listing?.id);
                      } else {
                        placeBid(listing?.id);
                      }
                    }}
                    className="px-4 py-2 bg-slate-800 mt-4 rounded-lg shadow-lg font-bold text-white  "
                  >
                    {listing.type === 0 ? "Make an offer" : "Place a Bid"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Listings;

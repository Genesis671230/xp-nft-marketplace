import { BigNumber, ethers } from "ethers";
import { useMemo, useState } from "react";
import marketplaceAbi from "../../abis/abiPolygonMarketplace.json";
import { useListing } from "../../hooks/useListing";
import {
  ConnectWallet,
  useActiveListings,
  useAddress,
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
import { Link, useNavigate } from "react-router-dom";
import ListingHero from "../../components/ListingHero/ListingHero";

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

  const address = useAddress();

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

  const createDirectListing = async (contractAddress, tokenId, price) => {
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
      await marketplaceContract?.contract?.buyoutListing(listingId, 1);
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
    await marketplaceContract?.contract?.auction?.makeBid(
      listingId,
      offerPrice
    );
  };
  const organizedUri = (uri) => {
    const formattedUri = uri.startsWith("ipfs://")
      ? uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      : uri;
    return formattedUri;
  };

  return (
    <>
      <div className="bg-gray-100  ">
        <ListingHero />
        {/* <section className="bg-gray-900 text-white">
  <div
    className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
  >
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
       Unlock the Value of Digital Collectibles

        <span className="sm:block">  </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
      Unlock the Future of Collectibles: Discover the World of NFTs on Our Marketplace
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/get-started"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/about"
        >
          Learn More
        </a>
      </div>
      </div>
      </div>
    </section> */}
      </div>

      <div className="p-10">
        <div className="text-[3rem]">All Listings</div>
        <div className="flex flex-wrap gap-10 mt-4">
          {allListings?.map((listing, index) => (
            <div className="card cursor-pointer w-96 bg-base-100 shadow-xl">
              <Link
                to={`/buyListing/${listing.id}`}
                state={{ listingData: listing }}
              >
                <figure className="overflow-hidden">
                  <img
                    className="object-cover h-[20rem] w-[24rem]"
                    src={
                      listing?.asset?.image || organizedUri(listing?.asset?.uri)
                    }
                    alt="Shoes"
                  />
                </figure>
              </Link>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between py-2">
                    {/* <div>
                      <h2 className="text-xl font-bold">
                      <span>{listing?.asset?.name}</span>
                      </h2>
                    </div> */}
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
                  {/* <div>
                    <p className="font-mono">{listing?.asset?.description}</p>
                  </div> */}
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
                  {/* 
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
                      </div> */}

                      

                  {listing.type === 0 && listing.sellerAddress !==address && (
                    <div
                      className="flex justify-end "
                      onClick={() => buyNft(listing?.id)}
                    >
                      {/* <button className="px-4 py-2 bg-sky-600 font-bold rounded-lg shadow-lg text-white  ">
                        Buy Now
                      </button> */}
                      <div
                        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-sky-600 before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] 
                      before:bg-gradient-to-r from-pink-600 to-purple-800  before:blur  group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt hover:text-black
                      before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
                      >
                        <span className="relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500">
                          Buy now
                        </span>
                      </div>
                    </div>
                  )}
                  {listing?.type === 1 &&listing.sellerAddress !== address&& (
                    <div className="flex relative  justify-end items-center ">
                      {/* <button className="px-4 py-2 bg-sky-600 font-bold rounded-lg shadow-lg text-white  ">
                        Buy Now
                      </button> */}
                      <div
                        className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-sky-600 before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] 
                      before:bg-gradient-to-r from-pink-600 to-purple-800  before:blur  group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt hover:text-black
                      before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
                      >
                        <span className="animate-pulse relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500">
                          {new Date(
                            BigNumber?.from(
                              listing?.endTimeInEpochSeconds
                            )?.toNumber() * 1000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="absolute bg-purple-700 text-white rounded-sm text-[12px] px-2 right-2 -top-6 animate-pulse z-10">
                        Ends in
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end flex-col">
                  {/* <div className="mt-4">
                    <input
                    onChange={(e) => setOfferPrice(e.target.value)}
                    type="text"
                    className="outline-none rounded-sm border-[1px] border-slate-300 w-full"
                    />
                  </div> */}
                  <Link
                    className=" outline-none"
                    to={`/buyListing/${listing?.id}`}
                    state={{ listingData: listing }}
                  >
                    <button
                      // onClick={() => {
                      //   if (listing.type === 0) {
                      //     makeOffer(listing?.id);
                      //   } else {
                      //     placeBid(listing?.id);
                      //   }
                      // }}
                      className="px-4 w-full py-2 bg-slate-800 mt-4 rounded-lg shadow-lg font-bold text-white  "
                    >
                      {listing?.type === 0 ? "Make an offer" : "Place a Bid"}
                    </button>
                  </Link>
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

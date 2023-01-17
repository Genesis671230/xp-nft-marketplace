import { NorthEast, Verified, VerifiedUser } from "@mui/icons-material";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { BigNumber } from "ethers";
import { ChainId, useAddress, useContract } from "@thirdweb-dev/react";
import { NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { ethereumClient } from "../../index.js";

const BuyListing = () => {
  const [listedNftData, setListedNftData] = useState();
  const [offerPrice, setOfferPrice] = useState();

  const address = useAddress();
  console.log(address);
  const marketplaceContract = useContract(
    "0x42182Ebad491D869dAafe47Fc6464F2089f8BB5a",
    "marketplace"
  );

  const { storeAddress } = useWallet();
  const {
    pathname,
    state: { listingData },
  } = useLocation();
  const tokenId = pathname.split("/")[2];
  const nftData = useSelector((state) => state.NftData.value);
  const accountData = useSelector((state) => state.accountData?.value);

  const getContractData = async () => {
    try {
      const contract = await nftData;

      if (contract) {
        const contractName = await contract?.name();
        const contractSymbol = await contract?.symbol();

        const regex = /(?<=[a-z])(?=[A-Z0-9])/g;
        const organizedName = contractName?.toString().replace(regex, " ");

        const getMetadata = async () => {
          const tokenMetadata = await fetch(await contract?.tokenURI(tokenId), {
            cache: "no-cache",
          });
          const ourObj = await tokenMetadata?.json();
          return ourObj;
        };

        const getTokenOwner = async () => {
          const tokenFunction = await contract?.ownerOf(tokenId);
          const owner = await fetch(tokenFunction);
          const ownerAddress = owner?.url?.toString().slice(-42);
          return ownerAddress;
        };

        const metaData = await getMetadata();
        const tokenOwner = await getTokenOwner();
        const obj = { ...metaData, tokenOwner: tokenOwner };

        console.log(metaData);
        const wrappedCollectionNftData = {
          name: organizedName,
          symbol: contractSymbol,
          metaData: obj,
        };
        setListedNftData(wrappedCollectionNftData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContractData();
  }, []);

  const { isOpen, open, close } = useWeb3Modal();

  console.log(accountData);
  const buyNft = async (listingId) => {
    try {
      const buy = await marketplaceContract?.contract.buyoutListing(
        listingId,
        1
      );
      console.log(buy);
    } catch (error) {
      console.log(error);
    }
  };

  const makeOffer = async (listingId) => {
    // The quantity of tokens you want to receive for this offer

    await marketplaceContract.contract?.direct?.makeOffer(
      listingId,
      1,
      NATIVE_TOKENS[ChainId.Mumbai].wrapped.address,
      Number(offerPrice)
    );
  };
  const placeBid = async (listingId) => {
    await marketplaceContract?.contract?.auction?.makeBid(
      listingId,
      offerPrice
    );
  };

  const acceptNftOffer = async (
    listingId,
    offerrer,
    currencyAddress,
    offeredPrice
  ) => {
    const offerAccepted =
      await marketplaceContract?.contract?.direct?.acceptOffer(
        listingId,
        offerrer,
        currencyAddress,
        offeredPrice
      );
    console.log(offerAccepted);
  };
  const organizedUri = (uri) => {
    const formattedUri = uri.startsWith("ipfs://")
      ? uri.replace("ipfs://", "https://ipfs.io/ipfs/")
      : uri;
    return formattedUri;
  };
  const calculateData = async (date) => {
    const deadline = new Date(date).toLocaleDateString();
    return deadline.toString();
  };

  console.log(listingData);

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-slate-50 p-20">
      <div className="flex flex-col md:flex-row gap-10 justify-center p-20 pt-0">
        <div>
          <img
            className="w-[23rem] md:w-[38rem] rounded-[0.375rem] h-[23rem] md:h-[42rem] object-cover"
            src={
              listingData?.asset?.image || organizedUri(listingData?.asset?.uri)
            }
            alt=""
          />
        </div>

        <div>
          <div className="text-slate-300">
            {listedNftData?.name}{" "}
            <span className="">
              <Verified className="text-blue-600 " />{" "}
            </span>
          </div>
          <div>
            <span className="text-[3rem] font-bold">
              {listingData?.asset?.name}...
            </span>{" "}
            <span className="text-[3rem] font-bold">#{tokenId}</span>
          </div>
          <div>
            <span className="text-slate-200">Seller address</span>{" "}
            <span className="  ">
              <VerifiedUser className=" text-red-800 " />
            </span>
            <span className="font-semibold">
              <div>
                {listingData?.sellerAddress.slice(0, 6)}...
                {listingData?.sellerAddress?.slice(-6)}
              </div>
            </span>
          </div>
          <div className="mt-10">
            <span className="text-slate-200 "> Listed For</span>{" "}
          </div>
          <div className="">
            <span className="text-slate-200 md:text-[3rem] text-[2rem] font-extrabold ">
              {" "}
              {listingData?.buyoutCurrencyValuePerToken?.displayValue}
            </span>{" "}
            <span className="text-red-800  md:text-[21px] text-[2rem] font-extrabold ">
              {" "}
              {listingData?.buyoutCurrencyValuePerToken?.symbol}
            </span>{" "}
            <div className="text-slate-400 md:text-[16px] text-[2rem] font-extrabold ">
              {" "}
              {listingData?.currencyContractAddress}
            </div>{" "}
          </div>
          <div className="my-6 flex flex-wrap gap-5">
            {listingData?.type === 0 && (
              <span
                onClick={() => buyNft(listingData?.id)}
                className="cursor-pointer bg-slate-200 mr-2 text-black rounded-[40px] md:px-16 px-12  md:py-6 py-4  md:text-[16px] whitespace-nowrap  font-semibold "
              >
                {" "}
                Buy Now
              </span>
            )}
            <span className="cursor-pointer bg-[#242424] text-slate-100 rounded-tr-[40px] md:pr-12 px-6 md:py-6 py-4 whitespace-nowrap text-[16px] font-semibold flex items-center justify-center gap-2">
              {" "}
              <input
                onChange={(e) => setOfferPrice(e.target.value)}
                type="text"
                className="w-24 bg-transparent border-[0.4px] rounded-sm px-2   border-slate-600  outline-none "
              />{" "}
              <span
                className={`${
                  offerPrice === undefined ||
                  (offerPrice === "" ? "cursor-not-allowed":"cursor-pointer")
                }`}
                onClick={() => {
                  if(listingData?.type===0){
                    makeOffer(listingData?.id)
                  }
                  
                  if(listingData?.type===1){
                    placeBid(listingData?.id)
                  }

                
                }}
              >
                <NorthEast /> <span> {listingData.type==0?  " Make offer":"Place a bid"}</span>
              </span>
            </span>{" "}
          </div>
          {/* <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex  flex-col p-2 bg-neutral rounded-box text-neutral-content">
              deadline
              <span className="text-white">
                {new Date(
                  BigNumber?.from(listingData?.secondsUntilEnd)?.toNumber()
                ).toLocaleDateString()}
              </span>
            </div>
          </div> */}
          <div className="my-6 flex flex-col gap-2">
            <div className="font-mono ">Properties</div>
            <div className="flex md:grid md:grid-cols-3 flex-wrap gap-10 ">
              {listingData?.asset?.attributes?.map((attribute) => (
                <div className="flex overflow-hidden gap-2 text-white font-semibold whitespace-nowrap  bg-slate-800 p-4 rounded-lg bottom-2 border-sky-800 shadow-md  shadow-violet-700  ">
                  <div className="font-mono text-slate-400 ">
                    {attribute?.trait_type}
                  </div>
                  <div className="">{attribute?.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div></div>
      </div>
      <div className="px-30 overflow-x-auto ">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                offered Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Quanitity Desired
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {listingData?.offers?.map((offer) => {
              console.log(
                address,
                listingData?.sellerAddress,
                address === listingData?.sellerAddress
              );
              return (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-50">
                    {offer?.buyerAddress}{" "}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-50">
                    {offer?.currencyValue?.displayValue}{" "}
                    {offer?.currencyValue?.symbol}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-50">
                    {BigNumber?.from(offer?.quantityDesired)?.toNumber()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-50">
                    {address == listingData?.sellerAddress && (
                      <button
                        onClick={() =>
                          acceptNftOffer(
                            listingData?.id,
                            offer?.buyerAddress,
                            listingData?.currencyContractAddress,
                            offer?.currencyValue?.displayValue
                          )
                        }
                        className="p-4 bg-red-600"
                      >
                        Accept offer
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyListing;

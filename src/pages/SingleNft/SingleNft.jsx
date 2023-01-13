import { NorthEast, Verified, VerifiedUser } from "@mui/icons-material";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";

const SingleNft = () => {
  const [singleNftData, setSingleNftData] = useState();

  const { storeAddress } = useWallet();
  const { pathname } = useLocation();
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
        setSingleNftData(wrappedCollectionNftData);
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
  const buyNft = async () => {
    try {
      const contract = await nftData;

      const buy = await contract.safeTransferFrom(
        singleNftData?.metaData?.tokenOwner,
        accountData?.address,
        tokenId
      );
      console.log(buy);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#0d0d0d] min-h-screen text-slate-50">
      <div className="flex flex-col md:flex-row gap-10 justify-center p-20">
        <div>
          <img
            className="w-[23rem] md:w-[38rem] rounded-[0.375rem] h-[23rem] md:h-[42rem] object-cover"
            src={singleNftData?.metaData?.image}
            alt=""
          />
        </div>

        <div>
          <div className="text-slate-300">
            {singleNftData?.name}{" "}
            <span className="">
              <Verified className="text-blue-600 " />{" "}
            </span>
          </div>
          <div>
            <span className="text-[3rem] font-bold">
              {singleNftData?.name}...
            </span>{" "}
            <span className="text-[3rem] font-bold">#{tokenId}</span>
          </div>
          <div>
            <span className="text-slate-200">Owned by</span>{" "}
            <span className="  ">
              <VerifiedUser className=" text-red-800 " />
            </span>
            <span className="font-semibold">
              <div>
                {singleNftData?.metaData.tokenOwner?.slice(0, 6)}...
                {singleNftData?.metaData.tokenOwner?.slice(-6)}
              </div>
            </span>
          </div>
          <div className="mt-10">
            <span className="text-slate-200 "> Listed For</span>{" "}
          </div>
          <div className="">
            <span className="text-slate-200 md:text-[3rem] text-[2rem] font-extrabold ">
              {" "}
              $8181
            </span>{" "}
          </div>
          <div className="my-6 flex flex-wrap gap-5">
            <span
              onClick={buyNft}
              className="cursor-pointer bg-slate-200 mr-2 text-black rounded-[40px] md:px-16 px-12  md:py-6 py-4  md:text-[16px] whitespace-nowrap  font-semibold "
            >
              {" "}
              Buy Now
            </span>{" "}
            <span className="cursor-pointer bg-[#242424] text-slate-100 rounded-[40px] md:px-12 px-6 md:py-6 py-4 whitespace-nowrap text-[16px] font-semibold flex items-center justify-center gap-2">
              {" "}
              <NorthEast /> <span> Make an offer</span>
            </span>{" "}
          </div>
          <div className="my-6 flex flex-col gap-2">
            <div className="font-mono ">Properties</div>
            <div className="flex md:grid md:grid-cols-3 flex-wrap gap-10 ">
              {singleNftData?.metaData?.attributes.map((attribute) => (
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
      </div>
    </div>
  );
};

export default SingleNft;

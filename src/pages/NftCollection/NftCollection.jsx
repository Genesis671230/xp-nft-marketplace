import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNftData } from "../../redux/NftDataSlice.ts";
import { Link } from "react-router-dom";

const NftCollection = () => {
  const [collectionData, setCollectionData] = useState();

  const nftData = useSelector((state) => state.NftDataSlice.value);

  const getContractData = async () => {
    const contract = await nftData;
    const contractName = await contract.name();
    const contractSymbol = await contract.symbol();

    const regex = /(?<=[a-z])(?=[A-Z0-9])/g;
    const organizedName = contractName.toString().replace(regex, " ");

    const getMetadata = async (token) => {
      const tokenMetadata = await fetch(await contract.tokenURI(token));
      const ourObj = await tokenMetadata.json();
      return ourObj;
    };
    let tokens = [];
    for (const item of [0, 1, 2, 3, 4]) {
      const metaData = await getMetadata(item);
      tokens.push(metaData);
    }
    const wrappedCollectionNftData = {
      name: organizedName,
      symbol: contractSymbol,
      allTokens: tokens,
    };
    setCollectionData(wrappedCollectionNftData);
  };
  useEffect(() => {
    getContractData();
  }, []);
  return (
    <div className="bg-[#0d0d0d] ">
      {collectionData?.allTokens?.length > 0 && (
        <div>
          <div className="text-center pt-6 text-white text-[4rem] font-semibold font-sans w-full">
            {" "}
            {collectionData?.name}
          </div>
          <div className="flex gap-x-10 mb-10 mx-10 flex-wrap">
            {collectionData?.allTokens?.map((token, index) => (
              <div className="w-[20rem] h-[20rem] my-32" key={index}>
                <Link to={`/singleNft/${index}`}>
                  <div className="overflow-hidden cursor-pointer  rounded-t-2xl">
                    <img
                      src={token?.image}
                      alt=""
                      className=" transition-all duration-500  hover:scale-110 w-[20rem] h-[20rem] object-cover"
                    />
                  </div>
                </Link>
                <div className="font-sans text-slate-200 bg-slate-800   shadow-slate-300 rounded-b-lg overflow-ellipsis flex flex-col justify-between gap-4 min-h-[12rem]    py-4 px-4">
                  <div>
                    <div>{token?.name}</div>
                    <div>{token?.description}</div>
                    <div>{token?.type}</div>
                  </div>
                  <div className="px-4 py-2 text-slate-50 bg-purple-700 font-bold   rounded-lg  w-fit ">
                    Buy Now
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NftCollection;

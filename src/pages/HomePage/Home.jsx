import React, { useMemo, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import abi from "../../abis/abi.json";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { setNftData } from "../../redux/Slices/NftDataSlice.ts";
import { setAccountAddress } from "../../redux/Slices/AccountSlice";
import { ethereumClient } from "../..";
const Home = () => {
  const [allContracts, setAllContracts] = useState();

  const [allNfts, setAllNfts] = useState([]);
  const address = useAddress();
  // const {
  //   contract: contractThirdWeb,
  //   isLoading,
  //   error,
  // } = useContract("0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD")

  const nftData = useSelector((state) => state.NftData.value)
  const dispatch = useDispatch()
  
  
  const getContractData = async () => {
    // const contractsData = contractAddresses.map(async (address) =>{
    const provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );

    const contract = new ethers.Contract(
      "0x5ADfa196fB3AD60a97149d7c2F542C4c2B738026",
      abi,
      provider
    );
    // return contract
    // })
    setAllContracts(contract);
    dispatch(setNftData(contract));
  };
  // const run = async () => {
  //   const nfts = await contractThirdWeb?.getAll();
  //   setAllNfts(nfts);
  // };

  useMemo(() => {
    //  run()
    getContractData();
    dispatch(setAccountAddress(ethereumClient.getAccount()?.address));
  }, []);

  return (
    <div className="App ">
      <div className="flex flex-wrap">
        <div className="flex flex-col flex-wrap w-full justify-between m-10">
          <CollectionCard contractData={allContracts} />
        </div>
      </div>
    </div>
  );
};

export default Home;

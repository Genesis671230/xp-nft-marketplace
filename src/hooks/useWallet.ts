import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { ethereumClient } from "../index.js";
//@ts-ignore
import { setAccountAddress } from "../redux/Slices/AccountSlice";
export const useWallet = () => {
  const account = useSelector((store: any) => store.AccountData.value);
  const dispatch = useDispatch();

  const storeAddress = () => {
    const address = ethereumClient?.getAccount()?.address;
    dispatch(setAccountAddress(address));
    
  };
  
  const getBalance = async () => {
    const address = await ethereumClient.fetchBalance(account.address);
    return address;
  };
  const getChain = () => {};
  return {
    storeAddress,
    getBalance,
    getChain,
  };
};

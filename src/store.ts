import { configureStore } from "@reduxjs/toolkit";
import { accountSlice, nftDataReducer } from "./redux";
import AccountSlice from "./redux/Reducers/AccountSlice";

export const store = configureStore({
  reducer: {
    NftData: nftDataReducer,
    AccountData: AccountSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { accountSlice, nftDataReducer } from "./redux";

export const store = configureStore({
  reducer: {
    NftData: nftDataReducer,
    AccountData: accountSlice,
  },
});

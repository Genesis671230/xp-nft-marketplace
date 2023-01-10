import { configureStore } from '@reduxjs/toolkit'
import {nftDataReducer} from "./redux"

export const store = configureStore({
  reducer: {
    NftDataSlice: nftDataReducer
    ,
  },
})



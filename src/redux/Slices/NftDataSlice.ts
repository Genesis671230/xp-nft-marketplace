import { createSlice } from '@reduxjs/toolkit'


const initialState: any = {
  value: {},
}

export const nftDataReducer = createSlice({
  name: 'nftData',
  initialState,
  reducers: {
    setNftData: (state,action) => {
      state.value = action.payload
    },
  },
})

export const {setNftData } = nftDataReducer.actions
export default nftDataReducer.reducer
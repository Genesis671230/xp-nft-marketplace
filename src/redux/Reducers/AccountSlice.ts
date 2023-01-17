import { createSlice } from '@reduxjs/toolkit'


const initialState: any = {
  value: {
    address:""
  },
}

export const accountSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setAccountAddress: (state,action) => {
      state.value = {...state.value,address:action.payload}
    },
  },
})

export const {setAccountAddress } = accountSlice.actions
export default accountSlice.reducer
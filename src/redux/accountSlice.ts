import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  account: any;
}

const initialState: AccountState = {
  account: null,
};

export const accountSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TabState {
  current: string | null;
}

const initialState: TabState = {
  current: "",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = tabSlice.actions;

export default tabSlice.reducer;

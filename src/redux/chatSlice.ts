import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  initialState: null,
  name: "chat",
  reducers: {
    setChat: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;

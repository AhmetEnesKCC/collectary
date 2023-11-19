import { createSlice } from "@reduxjs/toolkit";

const useRooms = createSlice({
  initialState: [],
  name: "rooms",
  reducers: {
    setRooms: (_, action) => {
      return action.payload;
    },
  },
});

export const { setRooms } = useRooms.actions;

export default useRooms.reducer;

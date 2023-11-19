import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import accountReducer from "./accountSlice";
import roomsReducer from "./roomsSlice";
import chatSlice from "./chatSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    account: accountReducer,
    rooms: roomsReducer,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

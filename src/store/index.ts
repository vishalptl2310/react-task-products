import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    productReducer: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

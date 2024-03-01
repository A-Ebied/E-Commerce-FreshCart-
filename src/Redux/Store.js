import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { allOrderReducer } from "./AllOrderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    allOrders: allOrderReducer,
  },
});

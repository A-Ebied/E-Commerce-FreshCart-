import { createSlice } from "@reduxjs/toolkit";

let initialState = { counter: 0 };
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => {
      state.counter += 1;
    },
    decrease: (state) => {
      state.counter -= 1;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;
export let counterReducer = counterSlice.reducer;

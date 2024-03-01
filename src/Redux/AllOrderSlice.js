import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  allOrders: [],
};

export let getAllOrders = createAsyncThunk("allOrder/getAllOrders", async function () {
  let { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/`
  );
  return data;
});
const allOrderSlice = createSlice({
  name: "allorder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.allOrders = action.payload;
    });
  },
});

export let allOrderReducer = allOrderSlice.reducer;

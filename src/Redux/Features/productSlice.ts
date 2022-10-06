import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../const/url";

interface CartState {
  status: "Idle" | "Pending" | "Success" | "Rejected";
  items: [];
  error: null;
}

const initialState = {
  items: [],
  status: "Idle",
  error: null,
} as CartState;

export const productsFetch = createAsyncThunk("products/productsFetch", async () => {
  const response = await axios.get(API_URL + "/products");
  return response?.data;
});

const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return (
      builder.addCase(productsFetch.pending, (state, action) => {
        state.status = "Pending";
      }),
      builder.addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "Success";
        state.items = action.payload;
      }),
      builder.addCase(productsFetch.rejected, (state, action) => {
        state.status = "Rejected";
      })
    );
  },
});

export default productSlice.reducer;

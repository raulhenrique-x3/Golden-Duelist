import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../Interfaces/interfaces";

interface ICart {
  cartItems: ICard[];
}

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
} as ICart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },

    removeFromCart(state, action) {
      const removeFromCart = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItems = removeFromCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

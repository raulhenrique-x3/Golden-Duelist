import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../Interfaces/interfaces";

interface ICart {
  cartItems: ICard[];
}

const initialState = {
  cartItems: [],
  cartQuantity: 0,
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

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item?.cartQuantity === 1) {
        state.cartItems.filter((item) => (item.cartQuantity = 1));
      } else {
        state.cartItems.filter((item) => item.cartQuantity--);
      }
    },

    removeFromCart(state, action) {
      const removeFromCart = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItems = removeFromCart;
    },
  },
});

export const { addToCart, removeFromCart, decrementQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

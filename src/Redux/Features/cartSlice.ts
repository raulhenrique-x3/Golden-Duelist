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
      console.log(itemIndex);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.findIndex((item) => item.id === action.payload);
      console.log(item);
      if (item >= 0) {
        state.cartItems[item].cartQuantity++;
      } else {
        state.cartItems.filter((item) => (item.cartQuantity = 1));
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.findIndex((item) => item.id === action.payload);

      if (state.cartItems[item].cartQuantity === 1) {
        state.cartItems[item].cartQuantity = 1;
      } else {
        state.cartItems[item].cartQuantity--;
      }
    },

    removeFromCart(state, action) {
      const removeFromCart = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItems = removeFromCart;
    },

    clearCart(state, action) {
      const clearCart = state.cartItems.map((item) => item.id !== action.payload);
      if (clearCart !== undefined) {
        return initialState;
      } else {
        return;
      }
    },
  },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart, incrementQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

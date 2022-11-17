import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../Interfaces/interfaces";

interface ICart {
  favoriteItems: ICard[];
}

const initialState = {
  favoriteItems: [],
} as ICart;

const favoriteSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToFavorite(state, action) {
      const itemIndex = state.favoriteItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.favoriteItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.favoriteItems.push(tempProduct);
      }
    },

    removeFromFavorite(state, action) {
      const removeFromFavorite = state.favoriteItems.filter((item) => item.id !== action.payload);
      state.favoriteItems = removeFromFavorite;
    },

    clearFavorite(state, action) {
      const clearFavorite = state.favoriteItems.map((item) => item.id !== action.payload);
      if (clearFavorite !== undefined) {
        return initialState;
      } else {
        return;
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite, clearFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;

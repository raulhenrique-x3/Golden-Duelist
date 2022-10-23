import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Features/cartSlice";
import { staplesApi } from "./Features/productsAPI";
import { allCardsApi } from "./Features/productsAPI";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import productSlice from "./Features/productSlice";

const persistConfig = {
  key: "root",
  storage,
  PAUSE,
};

const persistedReducer = persistReducer(persistConfig, productSlice);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [staplesApi.reducerPath]: staplesApi.reducer,

    allCards: cartReducer,
    [allCardsApi.reducerPath]: allCardsApi.reducer,

    persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER],
      },
    }).concat(staplesApi.middleware, allCardsApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

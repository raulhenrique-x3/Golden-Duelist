import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STAPLES_API_URL, API_URL } from "../../const/url";

export const staplesApi = createApi({
  reducerPath: "staplesApi",
  baseQuery: fetchBaseQuery({ baseUrl: STAPLES_API_URL }),
  endpoints: (builder) => ({
    getAllStaples: builder.query({
      query: () => "",
    }),
  }),
});

export const allCardsApi = createApi({
  reducerPath: "allCardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllCards: builder.query({
      query: () => "",
    }),
  }),
});
export const { useGetAllStaplesQuery } = staplesApi;
export const { useGetAllCardsQuery } = allCardsApi;

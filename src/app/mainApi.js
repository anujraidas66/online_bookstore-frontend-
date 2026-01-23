import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const base = 'https://book-backend-jx5k.onrender.com';

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
         baseUrl: 'https://book-backend-jx5k.onrender.com/api',
    }),
    endpoints: (builder) => ({}),
});



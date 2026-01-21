import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const base = 'http://book-backend-vitn.onrender.com';

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
         baseUrl: 'https://book-backend-vitn.onrender.com/api',
    }),
    endpoints: (builder) => ({}),
});



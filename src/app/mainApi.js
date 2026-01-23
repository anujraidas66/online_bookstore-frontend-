import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const base = 'https://book-backend-jx5k.onrender.com';

export const base = 'http://192.168.1.75:5000';


export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        //  baseUrl: 'https://book-backend-jx5k.onrender.com/api',
        baseUrl: 'http://192.168.1.75:5000/api',
    }),
    endpoints: (builder) => ({}),
});



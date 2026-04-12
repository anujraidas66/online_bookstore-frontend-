import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const base = 'https://book-backend-jx5k.onrender.com';

export const base = 'http://10.181.154.37:5000';


export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        //  baseUrl: 'https://book-backend-jx5k.onrender.com/api',
        baseUrl: 'http://10.181.154.37:5000/api',
    }),
    endpoints: (builder) => ({}),
});



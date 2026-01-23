import { mainApi } from "../../app/mainApi";

export const bookApi = mainApi.injectEndpoints({
    endpoints:(builder) => ({
        getBook:builder.query({
             query:(id) => ({
            url:`/books/${id}`,
            method: 'GET'
        }),
        providesTags: ['Book']
    }),

    
        getBooks:builder.query({
            query:() => ({
            url:'/books',
            method: 'GET'
        }),
        providesTags: ['Book']
    }),

        createBook:builder.mutation({
            query:(data) => ({
            url:'/books',
            method: 'POST',
            headers: {
                Authorization: data.token
            },
            body:data.body
        }),
        invalidatesTags: ['Book']
    }),

       updateBook: builder.mutation({
            query: (data) => ({
                url: `/books/${data.id}`,
                method: 'PATCH',
                 headers: {
                    Authorization:data.token
                },
                body:data.body
            }),
            invalidatesTags: ['Book']
        }),

    
        removeBook:builder.mutation({
            query:(data) => ({
            url:`/books/${data.id}`,
            method: 'DELETE',
            headers: {
                Authorization: data.token
            },
        }),
        invalidatesTags: ['Book']
    }), 
})
})

export const {useGetBooksQuery, useGetBookQuery,useCreateBookMutation,
     useRemoveBookMutation, useUpdateBookMutation } = bookApi;
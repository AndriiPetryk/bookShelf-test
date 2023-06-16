import { IBook } from '../models/IBook'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Book'],
  endpoints: (build) => ({
    getBooks: build.query<IBook[], void>({
      query: () => 'books',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Book' as const, id })),
              { type: 'Book', id: 'LIST' },
            ]
          : [{ type: 'Book', id: 'LIST' }],
    }),
    addBook: build.mutation<IBook, Partial<IBook>>({
      query: (body) => ({
        url: 'books',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Book', id: 'LIST' }],
    }),
    getBook: build.query<IBook, string>({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    updateBook: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
    }),
    deleteBook: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
  }),
})

export const {
  useGetBookQuery,
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';

const createRequest = (url) => ({ url});

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
      getBlogs: builder.query({
        query: () => '/blogs/',
        providesTags: ['Post'],
      }),

      getBlogById : builder.query({
        query: (id) => `/blogs/${id}`,
        providesTags: ['Post'],
      }),

      getLikedBlogs : builder.query({
        query: (liked) => `/blogs/?liked=${liked}`,
        providesTags: ['Post'], 
      }),

      getBlogByLimit : builder.query({
        query: (start,end) => `/blogs?_start=${start}&_end=${end}`,
        providesTags: ['Post'],
      }),

      getBlogBySearch : builder.mutation({
        query: (searchValue) => {
          return {
            url: `/blogs/?q=${searchValue}`,
            method: 'GET',
          }
        },
      }),

      addBlog : builder.mutation({
        query: (blog) => {
          console.log("api",blog);
          return {
            url: `/blogs/`,
            method: 'POST',
            body: blog,
          }
        },
        invalidatesTags: ['Post']
      }),

      updateBlog : builder.mutation({
        query: ({blog,id}) => {
          console.log("api",id,blog);
          return {
            url: `/blogs/${id}`,
            method: 'PUT',
            body: blog,
          }
        },
        invalidatesTags: ['Post']
      }),
      
      deleteBlog: builder.mutation({
        query: (id) => {
         console.log("Delete ID:", id)
         return {
          url: `/blogs/${id}`,
          method: 'DELETE'
         }
        },
        invalidatesTags: ['Post']
      }),

    }),
})

export const { 
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogBySearchMutation,
  useGetBlogByLimitQuery,
  useGetLikedBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi
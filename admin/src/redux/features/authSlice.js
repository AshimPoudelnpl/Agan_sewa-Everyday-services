import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    addManager: builder.mutation({
      query: (data) => ({
        url: "/auth/add-manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
    verifyToken:builder.query({
      query:()=>({
        url:"/auth/verifyToken",
        method:"GET"
      })
    }),
    getManager: builder.query({
      query: () => ({
        url: "/auth/get-manager",
        method: "GET",
      }),
      providesTags: ["manager"],
    }),
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/auth/delete-manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["manager"],
    }),
    editManager: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/auth/edit-manager/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
  }),
});
export const { 
  useLoginMutation, 
  useSignoutMutation,
  useAddManagerMutation,
  useVerifyTokenQuery,
  useGetManagerQuery,
  useDeleteManagerMutation,
  useEditManagerMutation
} = authAPIs;
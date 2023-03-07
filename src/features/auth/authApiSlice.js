import { apiSlice } from "../../services/api/apiAuthSlice";

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      login: builder.mutation({
         query: credentials => ({
            url: '/',
            method: 'POST',
            body: { ...credentials }
         })
      }),
   })
})

export const {
   useLoginMutation
} = authApiSlice 
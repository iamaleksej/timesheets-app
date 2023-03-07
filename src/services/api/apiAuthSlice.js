import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
   baseUrl: 'http://erp.apptrix.ru/api/token/',
   credentials: 'include',
   prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
         headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
   }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions)
   if (result?.error?.originalStatus === 401) {
      console.log('send refresh token')
      // send refresh token
      const refreshResult = await baseQuery('/refresh', api, extraOptions)
      console.log(refreshResult)
      if (refreshResult?.data) {
         const username = api.getState().auth.username
         // new token
         api.dispatch(setCredentials({ ...refreshResult.data, username }))
         // retry query with new access token
         result = await baseQuery(args, api, extraOptions)
      } else {
         api.dispatch(logOut())
      }
   }
   return result
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: builder => ({})
})
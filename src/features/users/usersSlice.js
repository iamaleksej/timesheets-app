import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../services/api/apiUsersSlice";

export const usersSlice = createSlice({
   name: "users",
   initialState: {
      data: [],
      loading: false
   },
   reducers: {},
   extraReducers: {
      [getUsers.pending]: (state) => {
         state.loading = true;
      },
      [getUsers.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.data = payload;
      },
      [getUsers.rejected]: (state) => {
         state.loading = false;
      }
   }

});

export default usersSlice.reducer

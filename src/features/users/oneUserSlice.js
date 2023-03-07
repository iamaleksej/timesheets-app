import { createSlice } from "@reduxjs/toolkit";
import { getOneUser } from "../../services/api/apiOneUserSlice";

export const oneUserSlice = createSlice({
   name: "oneUser",
   initialState: {
      user: null,
      loading: false
   },
   reducers: {},
   extraReducers: {
      [getOneUser.pending]: (state) => {
         state.loading = true;
      },
      [getOneUser.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.user = payload;
      },
      [getOneUser.rejected]: (state) => {
         state.loading = false;
      }
   }

});

export default oneUserSlice.reducer

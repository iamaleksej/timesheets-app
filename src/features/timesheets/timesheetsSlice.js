import { createSlice } from "@reduxjs/toolkit";
import { getTimesheets } from "../../services/api/apiTimesheetsSlice";

export const timesheetsSlice = createSlice({
   name: "timesheets",
   initialState: {
      data: {},
      loading: false,
   },
   reducers: {},
   extraReducers: {
      [getTimesheets.pending]: (state) => {
         state.loading = true;
      },
      [getTimesheets.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.data = payload;
      },
      [getTimesheets.rejected]: (state) => {
         state.loading = false;
      }
   }

});

export default timesheetsSlice.reducer

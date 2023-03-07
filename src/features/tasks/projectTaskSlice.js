import { createSlice } from "@reduxjs/toolkit";
import { getProjectTask } from "../../services/api/apiProjectTaskSlice";

export const projectTaskSlice = createSlice({
   name: "projectTask",
   initialState: {
      data: [],
      loading: false
   },
   reducers: {},
   extraReducers: {
      [getProjectTask.pending]: (state) => {
         state.loading = true;
      },
      [getProjectTask.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.data = payload;
      },
      [getProjectTask.rejected]: (state) => {
         state.loading = false;
      }
   }

});

export default projectTaskSlice.reducer

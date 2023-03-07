import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../../services/api/apiTasksSlice";

export const tasksSlice = createSlice({
   name: "tasks",
   initialState: {
      data: [],
      loading: false
   },
   reducers: {},
   extraReducers: {
      [getTasks.pending]: (state) => {
         state.loading = true;
      },
      [getTasks.fulfilled]: (state, { payload }) => {
         state.loading = false;
         state.data = payload;
      },
      [getTasks.rejected]: (state) => {
         state.loading = false;
      }
   }

});

export default tasksSlice.reducer

import { createAsyncThunk } from "@reduxjs/toolkit";


export const getTasks = createAsyncThunk("tasks/getTasks", async (thunkAPI) => {
   const res = await fetch(
      "https://demo-apptrix.myjetbrains.com/youtrack/api/issues?fields=id,summary,project(name)",
      {
         headers: new Headers({
            Authorization: `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
         })
      }
   ).then((data) => { return data.json() });

   return res;
});
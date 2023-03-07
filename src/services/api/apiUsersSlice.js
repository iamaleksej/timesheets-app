import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUsers = createAsyncThunk("users/getUsers", async (thunkAPI) => {
   const res = await fetch(
      "https://demo-apptrix.myjetbrains.com/youtrack/api/users?fields=id,login,name,email,type",
      {
         headers: new Headers({
            Authorization: `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
         })
      }
   ).then((data) => { return data.json() });
   return res;
});
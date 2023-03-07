import { createAsyncThunk } from "@reduxjs/toolkit";


export const getOneUser = createAsyncThunk("oneUser/getOneUser", async (id) => {
   const res = await fetch(
      `https://demo-apptrix.myjetbrains.com/youtrack/api/users/${id}?fields=id,login,name,email,type`,
      {
         headers: new Headers({
            Authorization: `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
         })
      }
   ).then((data) => { return data.json() });
   return res;
});
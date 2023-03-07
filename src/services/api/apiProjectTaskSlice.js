import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProjectTask = createAsyncThunk("projectTask/getProjectTask", async (name) => {
   name = name.split(' ').join('+')
   if (name !== 'all') {
      name = `&query=project:+%7B${name}%7D`
   } else {
      name = ''
   }
   const res = await fetch(
      `https://demo-apptrix.myjetbrains.com/youtrack/api/issues?fields=id,summary,project(name)${name}`,
      {
         headers: new Headers({
            Authorization: `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
         })
      }
   ).then((data) => { return data.json() });

   return res;
});
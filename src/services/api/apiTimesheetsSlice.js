import { createAsyncThunk } from "@reduxjs/toolkit";


export const getTimesheets = createAsyncThunk("timesheet/getTimesheet", async (id) => {

   const res = await fetch(
      `https://demo-apptrix.myjetbrains.com/youtrack/api/workItems/${id}?author(fullName),duration(minutes)`,
      {
         headers: new Headers({
            Authorization: `Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL`
         })
      }
   ).then((data) => { return data.json() });
   const totalMinutes = res.duration.totalMinutes
   const hours = Math.floor(totalMinutes / 60)
   const minutes = totalMinutes % 60
   const formattedTime = hours + ' hours ' + minutes + ' minutes'
   res.duration.totalMinutes = formattedTime
   return res;
});
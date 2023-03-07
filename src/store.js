import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/api/apiAuthSlice";
import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import oneUserReducer from './features/users/oneUserSlice';
import tasksReducer from './features/tasks/tasksSlice';
import projectTaskReducer from './features/tasks/projectTaskSlice'
import timesheetsReducer from './features/timesheets/timesheetsSlice'

export const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      users: usersReducer,
      oneUser: oneUserReducer,
      tasks: tasksReducer,
      projectTask: projectTaskReducer,
      timesheets: timesheetsReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true
})
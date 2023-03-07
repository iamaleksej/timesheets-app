import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../Auth";
import Homepage from "../Homepage";

import Layout from "../Layout";
import RequireAuth from "../RequireAuth/RequireAuth";
import TimesheetsPdf from "../Timesheets/TimesheetsPdf";

import "./App.sass";

const App = () => {
   return (
      <main role="main" className="container">
         <Routes>npm run build
            <Route path="/timesheets-app" element={<Layout />}>
               <Route path="/timesheets-app" element={<Navigate to="/auth" />} />
               <Route path="/timesheets-app/auth" element={<Auth />} />

               <Route element={<RequireAuth />}>
                  <Route path="/timesheets-app/home/*" element={<Homepage />} />
                  <Route path="/timesheets-app/home/timesheets/:taskId/pdf" element={<TimesheetsPdf />} />
               </Route>
            </Route>
         </Routes>
      </main>
   );
};

export default App;
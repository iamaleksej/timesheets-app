import React from "react";
import TasksList from "../TasksList";
import UsersList from "../UsersList";
import OneUser from "../OneUser";
import Timesheets from "../Timesheets";


import { Routes, Route } from "react-router-dom";

import "./Homepage.sass";

const Homepage = () => {
   return (
      <div>
         <Routes>
            <Route path="/:userId" element={<OneUser />} />
            <Route path="/timesheets/:taskId" element={<Timesheets />} />
         </Routes>
         <UsersList />
         <TasksList />
      </div>
   );
};

export default Homepage;
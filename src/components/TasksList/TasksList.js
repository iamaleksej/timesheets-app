import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTasks } from "../../services/api/apiTasksSlice"
import { getProjectTask } from '../../services/api/apiProjectTaskSlice';
import { useDebounce } from "../../hooks/useDebounce";
import { useSortProjects } from "../../hooks/useSortProjects";

import './TasksList.sass'
import { useNavigate } from "react-router-dom";
import { getTimesheets } from "../../services/api/apiTimesheetsSlice";


const TasksList = () => {
   const { data: tasks, loading } = useSelector((state) => state.tasks);
   const { data: projectTask } = useSelector((state) => state.projectTask);
   const dispatch = useDispatch()
   const [searchValue, setSearchValue] = useState('');

   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getTasks());
   }, [dispatch])

   const currentTasks = projectTask.length ? projectTask : tasks

   const onProjectSelected = (projectName) => {
      setSearchValue('')
      dispatch(getProjectTask(projectName))
   }

   const onSearchProject = (debounceValue) => setSearchValue(debounceValue)

   const debounceValue = useDebounce(searchValue, 1000);
   const sortProjects = useSortProjects()

   useEffect(() => {
      if (debounceValue.length > 2) {
         dispatch(getProjectTask(debounceValue))
      }
   }, [debounceValue])

   const navigateHandler = (id) => {
      dispatch(getTimesheets(id))
      navigate(`./timesheets/${id}`)
   }


   return (
      <>
         {loading && <p>Загрузка...</p>}
         {!loading && (
            <div className="tasks-wrapper">
               <h2 className="title">Задачи:</h2>
               <table>
                  <thead>
                     <tr>
                        <th className="bold">ID</th>
                        <th className="bold">Проект</th>
                        <th className="bold">Описание</th>
                        <th className="bold">Timesheets</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td></td>
                        <td>
                           <div className="table-filter">
                              <select
                                 onChange={(e) => onProjectSelected(e.target.value)}>
                                 <option value="all">Все проекты</option>
                                 {sortProjects.map(item => {
                                    return (
                                       <option key={item}
                                          value={item}
                                       >
                                          {item}
                                       </option>
                                    )
                                 })}
                              </select>
                              <input
                                 value={searchValue}
                                 placeholder="Название проекта"
                                 onChange={(e) => onSearchProject(e.target.value)} />
                           </div>
                        </td>
                        <td></td>
                        <td></td>
                     </tr>
                     {currentTasks.map((task) => {
                        return (
                           <tr key={task.id}>
                              <td>{task.id}</td>
                              <td>{task.project.name}</td>
                              <td>{task.summary}</td>
                              <td>
                                 <button
                                    className="btn"
                                    onClick={() => navigateHandler(task.id)}
                                 >
                                    Timesheet
                                 </button>
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div >
         )
         }
      </>
   );
}

export default TasksList
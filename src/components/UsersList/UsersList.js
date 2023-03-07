import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../services/api/apiUsersSlice"
import { getOneUser } from "../../services/api/apiOneUserSlice"


import './UserList.sass'



const UsersList = () => {
   const { data: users, loading, error } = useSelector((state) => state.users);
   const dispatch = useDispatch()
   const navigate = useNavigate();


   const navigateHandler = (id) => {
      dispatch(getOneUser(id))
      navigate(`./${id}`)
   }
   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch])


   return (
      <>
         {loading && <p>Загрузка...</p>}
         {!loading && (
            <div className="users-wrapper">
               <h2 className="title">Пользователи:</h2>
               <table>
                  <thead>
                     <tr>
                        <th className="bold">ID</th>
                        <th className="bold">Имя</th>
                        <th className="bold">Логин</th>
                        <th className="bold">Эл. почта</th>
                        <th className="bold"></th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user) => {
                        return (
                           <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.login}</td>
                              <td>{user.email}</td>
                              <td>
                                 <button
                                    className="btn"
                                    onClick={() => navigateHandler(user.id)}>
                                    Открыть
                                 </button>
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>
         )}
         {error && <p>{JSON.stringify(error)}</p>}
      </>
   );
}

export default UsersList
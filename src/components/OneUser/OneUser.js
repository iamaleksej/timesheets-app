import Modal from "react-modal";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./OneUser.sass";

Modal.setAppElement("#wrapper");


const OneUser = () => {
   const { user, loading } = useSelector((state) => state.oneUser);

   const navigate = useNavigate();

   const goBackHandler = () => {
      navigate(`./..`);
   };


   return (
      <>
         {loading && <p>Загрузка...</p>}
         {!loading && (
            <Modal
               isOpen
               onRequestClose={goBackHandler}
               className="modal"
               contentLabel="Example Modal"
            >
               <div className="user-wrapper">
                  <div className="user">
                     <div className="user__item"><span className="bold">ID:</span> {user.id}</div>
                     <div className="user__item"><span className="bold">Имя:</span> {user.name}</div>
                     <div className="user__item"><span className="bold">Логин:</span>{user.login}</div>
                     <div className="user__item"><span className="bold">
                        Эл. почта:</span> {user.email}
                     </div>
                     <div className="user__item"><span className="bold">Тип:</span> {user.$type}</div>
                  </div>
                  <button
                     className="btn"
                     onClick={goBackHandler}>Назад</button>
               </div>
            </Modal>
         )}
      </>
   );
};

export default OneUser;
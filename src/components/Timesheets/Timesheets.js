import Modal from "react-modal";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Timesheets.sass'
Modal.setAppElement("#wrapper");


const Timesheet = () => {
   const { data: timesheets, loading } = useSelector((state) => state.timesheets);
   const navigate = useNavigate();

   const goBackHandler = () => {
      navigate(`../`);
   };

   const onExportPdf = () => {
      navigate(`./pdf`);
   }

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
               <div className="timesheets-wrapper">
                  <div className="timesheets">
                     {!timesheets.error && <p>Нет данных</p>}
                     {timesheets.error && (
                        <table>
                           <thead>
                              <tr>
                                 <th className="bold">Название</th>
                                 <th className="bold">Время</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>{timesheets?.author?.fullName}</td>
                                 <td>{timesheets?.duration?.minutes}</td>
                              </tr>
                           </tbody>
                        </table>
                     )}
                  </div>
                  <button
                     className="btn"
                     onClick={onExportPdf}>Скачать PDF</button>
                  <button
                     className="btn"
                     onClick={goBackHandler}>Назад</button>
               </div>
            </Modal>
         )
         }
      </>
   );
};

export default Timesheet;
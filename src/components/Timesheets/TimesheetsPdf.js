import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import Modal from "react-modal";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#wrapper");

const TimesheetsPdf = () => {
   const { data: timesheets } = useSelector((state) => state.timesheets);
   const navigate = useNavigate();

   const goBackHandler = () => {
      navigate(`./../`);
   };
   const styles = StyleSheet.create({
      viewer: {
         height: '100%'
      },
      page: {
         flexDirection: 'column',
         backgroundColor: '#fff',
         margin: 10,
         width: '96%',
         height: '100%',
         borderTop: '1px solid #000',
         borderLeft: '1px solid #000',

      },
      section: {
         flexDirection: 'row',
         width: '50%',
         padding: 10,
         flexGrow: 1,
         borderRight: '1px solid #000',
         borderBottom: '1px solid #000',
         minHeight: '40px'
      },
      header: {
         flexDirection: 'row',
      },
      body: {
         flexDirection: 'row',
      },
      textCenter: {
         textAlign: 'center',
         marginTop: 20
      }
   });


   return (
      <Modal
         isOpen
         onRequestClose={goBackHandler}
         className="modal-pdf"
         contentLabel="Example Modal"
      >
         <div className="timesheets-pdf">
            <button
               className="btn-back btn"
               onClick={goBackHandler}
            >
               Назад
            </button>
            <PDFViewer style={styles.viewer}>
               <Document>
                  <Page size="A4">
                     {!timesheets.error && (
                        <Text style={styles.textCenter}>No data</Text>
                     )}{timesheets.error && (
                        <View style={styles.page}>
                           <View style={styles.header}>
                              <View style={styles.section}>
                                 <Text>Name</Text>
                              </View>
                              <View style={styles.section}>
                                 <Text>Timesheet</Text>
                              </View>
                           </View>
                           <View style={styles.body}>
                              <View style={styles.section}>
                                 <Text>{timesheets?.author?.fullName}</Text>
                              </View>
                              <View style={styles.section}>
                                 <Text>{timesheets?.duration?.minutes}</Text>
                              </View>
                           </View>
                        </View>
                     )}
                  </Page>
               </Document>
            </PDFViewer>
         </div>
      </Modal>
   );
};

export default TimesheetsPdf;
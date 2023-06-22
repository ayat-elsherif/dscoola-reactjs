import { Button, Modal } from "antd";
import React, { useState } from "react";
import { EditIcon } from "../../../../../../../assets/svg";

export default function EditSection() {
   const [open, setOpen] = useState(false);
   console.log(open, "soudfh");
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [modalText, setModalText] = useState("Content of the modal");
   // const showModal = () => {
   //     setOpen(true);
   // };
   const handleOk = () => {
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(true);
      setTimeout(() => {
         // setOpen(false);
         setConfirmLoading(false);
      }, 2000);
   };
   const handleCancel = () => {
      console.log("Clicked cancel button");
      // setOpen(false);
   };
   return (
      <>
         <EditIcon
            onClick={() => {
               setOpen(true);
            }}
            className="edit-icon-course-content action-show animate__pulse"
         />
         <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
         >
            <p>{modalText}</p>
         </Modal>
      </>
   );
}

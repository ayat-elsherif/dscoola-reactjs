import { Radio } from "antd";
import React, { useState } from "react";
import { DeleteIcon } from "../../../../../../assets/svg";
import DeleteModal from "../components/deleteModal";
import "./index.scss";

const CreditCard = ({ data, checkable, onChange, checkedValue }) => {
   const [openDeleteModal, setOpenDeleteModal] = useState(false);

   const hideDeleteModal = () => {
      setOpenDeleteModal(false);
   };

   const showDeleteModal = () => {
      setOpenDeleteModal(true);
   };

   const cardTypeImage = () => {
      if (data?.method_type === "visa")
         return "/assets/images/visa.png"

   }
   return (
      <>
         <div className="credit-card">
            <div className="card-type-number">
               {checkable && <Radio checked={checkedValue === data.stripe_payment_method_id} onChange={(e) => onChange(e, data.stripe_payment_method_id)} value={checkedValue}></Radio>}
               <img src={cardTypeImage()} alt={data?.method_type} />
               <span className="card-number">************{data.last4}</span>
            </div>
            <div className="card-actions-expire">
               <span className="expire">Expire {data?.exp_month}/{data?.exp_year?.toString().slice(2, 4)}</span>
               <span className="delete">
                  <DeleteIcon onClick={showDeleteModal} />
               </span>
            </div>
         </div>
         <DeleteModal isOpen={openDeleteModal} cancel={hideDeleteModal} data={data} />
      </>
   );
};

export default CreditCard;

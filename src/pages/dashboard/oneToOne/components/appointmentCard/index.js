import { useQueryClient } from "@tanstack/react-query";
import { capitalize } from "lodash";
import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../../../../../components/common/dashboard/components/button";
import { saveChatRoomName } from "../../../../../features/chatRoom/chatRoom";
import { useDeleteAppointment } from "../../hooks/useOneToOne";
import "./index.scss";

const AppointmentCard = ({ data }) => {
  console.log(data,"a;sdc")
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDeleteSuccess = () => {
    queryClient.invalidateQueries("my-one-to-one");
  };
  const onDeleteFalid = (data) => {
    console.log("daaata", data);
  };
  const { mutate: deleteAppointment, isLoading } = useDeleteAppointment(
    onDeleteSuccess,
    onDeleteFalid
  );

  const handalJoin = (roomName) => {
    dispatch(saveChatRoomName(roomName));
    navigate(`/video-chat`);
  };

  const handalDelete = (id) => {
    deleteAppointment(id);
  };
  const meetingStatus =(status)=>{
if(status===1)return "Upcomming appointment"
if(status===2)return "Appointment Done"
if(status===3)return "Expired Appointment"
if(status===4)return "Happening now appointment"
  }
  return (
    <div className="appointment-card">
      <div className="appointment-card_details">
        <div className={`status ${data?.meeting_status}`}>
          {meetingStatus(data?.meeting_status)} Appointment
        </div>
        <div className="title">Discussions: {data?.title}</div>
        <div className="instructor-with">
          With instructor: <span>{data?.instructor_name}</span>
        </div>
      </div>
      <div className="appointment-card_date-actions">
        <div className="date">{dayjs(data?.date).format("MMMM d, YYYY • hh:mm a ")}</div>
        <div className="actions">
          {data.meeting_status !== "happening" ? (
            <DashboardButton
              text="Delete"
              btnClass="delete"
              onclick={() => handalDelete(data?.id)}
              type="link"
              loading={isLoading}
            ></DashboardButton>
          ) : null}
          {data.meeting_status === "happening" ? (
            <DashboardButton
              text="join"
              btnClass="update"
              onclick={() =>
                handalJoin({ room_name: data.room_name, id: data.id })
              }
              type="link"
            ></DashboardButton>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;

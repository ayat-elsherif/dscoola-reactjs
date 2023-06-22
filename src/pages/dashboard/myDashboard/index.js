import React, { useEffect } from "react";

import Courses from "./components/Courses";
import Groups from "./components/Groups";
import UpComingMeeting from "./components/upComingMeeting";
import Certificates from "./components/Certificates";
import Talks from "./components/Talks";
import fetch from "../../../auth/AuthInterceptor";
import {
   completedIcon,
   EnrolledIcon,
   GroupsenrolledIcon,
   InProgressIcon,
   MygroupsIcon,
   PointsIcon,
} from "../../../assets/svg";

import "./index.scss";
import service from "../../../auth/AuthInterceptor";
import { Col, Row } from "antd";
import { useState } from "react";
import Loading from "../../../components/common/dashboard/shared-components/Loading";

const Dashboard = () => {
   const [enrooledCourses, setEnrooledCourses] = useState(null);
   const [certificate, setCertificate] = useState([]);
   const [inprogressCourses, setInprogressCourses] = useState(null);
   const [completedCourses, setCompletedCourses] = useState(null);
   const [yallaStatistics, setYallaStatistics] = useState({});
   //setYallaStatistics
   const [loading, setLoading] = useState(false);
   const coursesData = [
      {
         icon: EnrolledIcon,
         data: {
            number: enrooledCourses,
            text: "Enrolled",
         },
      },
      {
         icon: InProgressIcon,
         data: {
            number: inprogressCourses,
            text: "In progress",
         },
      },
      {
         icon: completedIcon,
         data: {
            number: completedCourses,
            text: "Completed",
         },
      },
   ];

   const groupsData = [
      {
         icon: GroupsenrolledIcon,
         data: {
            number: yallaStatistics.total_enrolled,
            text: "Enrolled",
         },
      },
      {
         icon: MygroupsIcon,
         data: {
            number: yallaStatistics.total_mygroups,
            text: "My Groups",
         },
      },
      {
         icon: PointsIcon,
         data: {
            number: yallaStatistics.total_point,
            text: "Available Points",
         },
      },
   ];
   const members = [
      {
         src: "/assets/images/avatar.png",
         name: "mizar",
      },
      {
         src: "/assets/images/avatar.png",
         name: "mizar2",
      },
      {
         src: "",
         name: "mizar3",
      },
      {
         src: "/assets/images/avatar.png",
         name: "mizar4",
      },
      {
         src: "/assets/images/avatar.png",
         name: "mizar5",
      },
      {
         src: "/assets/images/avatar.png",
         name: "mizar6",
      },
   ];

   console.log(certificate, "slhfiwelf");
   useEffect(() => {
      setLoading(true);
      fetch({
         url: `api/my/dashboard/course-statistics`,
         method: "get",
         headers: {
            "public-request": "true",
         },
      })
         .then((res) => {
            console.log(res, "dlfijgerth");
            setEnrooledCourses(res.data.total_entrolled);
            setCompletedCourses(res.data.total_completed);
            setInprogressCourses(res.data.total_inprogress);
         })
         .catch((err) => {});
         fetch({
          url: `api/my/dashboard/yalla-statistics`,
          method: "get",
          headers: {
             "public-request": "true",
          },
       })
          .then((res) => {
             
             setYallaStatistics(res.data);
             
          })
          .catch((err) => {});
          fetch({
            url: `api/my/dashboard/upcomming-events`,
            method: "get",
            headers: {
               "public-request": "true",
            },
         })
            .then((res) => {
               console.log(res, "dlfijgqwdqwefwweferth");
              //  setYallaStatistics(res.data);
               
            })
            .catch((err) => {});
         //

      fetch({
         url: `api/my/dashboard/my-certificates`,
         method: "get",
         headers: {
            "public-request": "true",
         },
      })
         .then((res) => {
            setLoading(false);
            console.log(res.data, "dlfijgerth");
            setCertificate(res);
         })
         .catch((err) => {
            setLoading(false);
         });
   }, []);
   return (
      <>
         {" "}
         {loading ? (
            <Loading />
         ) : (
            <div className="dashboard">
               <Row gutter={20}>
                  <Col xs={24} sm={24} lg={16} xxl={16}>
                     <Courses data={coursesData} />
                     <Groups data={groupsData} />
                  </Col>
                  <Col xs={24} sm={24} lg={8} xxl={8}>
                     <UpComingMeeting members={members} />
                  </Col>
               </Row>
               <Row gutter={20}>
                  <Col xs={24} sm={24} lg={16} xxl={16}>
                     <Certificates data={certificate} />
                  </Col>
                  <Col xs={24} sm={24} lg={8} xxl={8}>
                     <Talks />
                  </Col>
               </Row>
            </div>
         )}
      </>
   );
};

export default Dashboard;

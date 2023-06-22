import { Col, Row } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoCoursrsIcon } from "../../../../assets/svg";

const Certificates = ({ data }) => {
   const navigate = useNavigate();
   return (
      <div className="certificates">
         <div className="main-header">
            <h3 className="dashboard-page-title">My Certificates</h3>
            <Link to="/student-dashboard/certificates">Show all</Link>
         </div>
         <div className="certificate-card">
            {" "}
            <Row gutter={28}>
               {data.map((certificate, index) => {
                  return (
                     <Col xs={24} sm={24} lg={8} xxl={6} key={index}>
                        <div
                           onClick={() =>
                              navigate(
                                 `/student-dashboard/certificates/${certificate.id}`,
                                 {
                                    state: certificate.title,
                                 }
                              )
                           }
                           className="my-certificate"
                        >
                           <img
                              src={certificate.certificate_url}
                              alt="certificate"
                           />
                           <div className="title">{certificate.title}</div>
                        </div>
                     </Col>
                  );
               })}
            </Row>
            {data?.length == 0 && (
               <div className="no-courses-container">
                  <NoCoursrsIcon />
                  <div className="no-courses">You Have No Certificates </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Certificates;

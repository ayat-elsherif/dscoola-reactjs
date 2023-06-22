import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Col, Grid, Row, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import EmptyCard from "../../../helpers/emptyCard";
import SertificatesServices from "../../../services/Certificates";
import Utils from "../../../utils";
import { myCertificates } from "./components/data";
import "./index.scss";
const { useBreakpoint } = Grid;
const Certificates = () => {
    const screens = Utils.getBreakPoint(useBreakpoint());
    const isxxlap = screens.includes("xxl");
    let navigate = useNavigate();
    const [allCertificates, setAllCertificates] = useState([]);
    const getAllCerificates = () => {
        return SertificatesServices.getAllCerificates();
    };
    const onSuccess = (data) => {
        console.log(data, "erjgep");
        setAllCertificates(data);
    };
    const onError = (data) => {};
    const { isLoading, data } = useQuery(
        [`all-certificates`],
        () => getAllCerificates(),
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
    return (
        <div className="certificates">
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    {" "}
                    <div className="dashboard-page-header-container">
                        <div className="page-header-left">
                            <h3 className="dashboard-page-title">
                                My Certificates
                            </h3>
                            <p>
                                You have {allCertificates?.length} Certificates
                            </p>
                        </div>
                    </div>
                    {!allCertificates?.length && (
                        <EmptyCard text="You don't have any Certificates yet" />
                    )}
                    <Row gutter={!isxxlap ? 30 : 24}>
                        {allCertificates?.map((certificate) => {
                            return (
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={8}
                                    xl={6}
                                    xxl={4}
                                    key={certificate.id}
                                    onClick={() =>
                                        navigate(
                                            `/student-dashboard/certificates/${certificate.id}`,
                                            {
                                                state: certificate.title,
                                            }
                                        )
                                    }
                                >
                                    <div className="my-certificate">
                                        <img
                                            src={certificate.certificate_url}
                                            alt="certificate"
                                        />
                                        <div className="title">
                                            {certificate.title}
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </>
            )}
        </div>
    );
};

export default Certificates;

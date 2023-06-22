import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Col, Grid, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { protectAxios } from '../../../../../apis/coursesAPI';
import { ArrowIcon, BackArrowIcon } from '../../../../../assets/svg';
import SertificatesServices from '../../../../../services/Certificates';
import Utils from '../../../../../utils';
import { saveAs } from 'file-saver';
import './index.scss';
import { useDownload } from './useDownload';
import { useSelector } from 'react-redux';
const { useBreakpoint } = Grid;

const CertificateDetails = () => {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const { currentUser } = useSelector((state) => state?.user);

  const isxxlap = screens.includes('xxl');
  let navigate = useNavigate();
  let { id } = useParams();
  console.log('id', id);
  const location = useLocation();
  console.log('location', location);
  const [certificatesDetailes, setCertificatesDetailes] = useState({});
  const getCerificatesDetailes = (id) => {
    return SertificatesServices.getCerificatesDetailes(id);
  };
  const onSuccess = (data) => {
    console.log(data.data[0], 'erjgep');
    setCertificatesDetailes(data.data[0]);
  };
  const onError = (data) => {};
  const { isLoading, data } = useQuery(
    [`certificates-detailes`],
    () => getCerificatesDetailes(id),
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const onDownloadSuccsses = (data) => {
    console.log(data, 'suc data');
  };
  const onFail = (data) => {};

  const {
    mutate,
    isLoading: downloadIsloading,
    refetch,
  } = useDownload(onDownloadSuccsses, onFail);
  // const onDownload=()=>{
  //   refetch

  // }
  const onDownload = (id) => {
    const win = window.open(certificatesDetailes?.certificate_url);
    win.focus();

    // protectAxios
    //     .post(
    //         `certificate/download/${id}`
    //     )
    //     .then((res) => {
    //         console.log(res,"dpfohjrt")
    //         const win = window.open(
    //           certificatesDetailes?.certificate_url
    //         );
    //         win.focus();

    //     })
    //     .catch((err) => {

    //        });
  };

  const downloadImage = () => {
    saveAs(certificatesDetailes?.certificate_url, 'image.png'); // Put your image url here.
  };

  return (
    <div className="certificate-details">
      <div className="certificate-details_header">
        <div className="title">
          My Certificates <ArrowIcon /> <span>{location?.state}</span>
        </div>
        <div className="back" onClick={() => navigate(-1)}>
          <BackArrowIcon /> Back
        </div>
      </div>
      <div className="certificate-details_body">
        <Row gutter={!isxxlap ? 20 : 50}>
          <Col xs={24} sm={24} md={14}>
            <img src={certificatesDetailes?.certificate_url} alt="certifi" />
          </Col>
          <Col xs={24} sm={24} md={10}>
            <div className="congratulations-card">
              <h3>Congratulations {currentUser?.name},</h3>
              <p>
                You have obtained a certificate for{' '}
                {certificatesDetailes?.title} Course
              </p>
              <div className="date">
                {dayjs(certificatesDetailes?.created_at).format('LL')}
              </div>
              <div className="actions">
                <Button
                  type="primary"
                  onClick={
                    // ()=>onDownload(certificatesDetailes?.certificate_id)
                    downloadImage
                  }
                  loading={downloadIsloading}
                  // className="download"
                >
                  Download Certificate
                </Button>
                <Button

                // className="share"
                >
                  Share Certificate
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CertificateDetails;

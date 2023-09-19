import { useQueryClient } from '@tanstack/react-query';
import { Row, Col } from 'antd';
import OwnModal from 'components/own/OwnModal';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RequestAppointment from '../../../components/containers/views/layouts/coursePreview/CoursePreviewTabs/appointments/RequestAppointment';
import MainButton from '../../../helpers/Buttons/MainButton';
import { dollarSign } from '../../instructors/instructor/SVGs';

function OneOnOneSection({ myCourse }) {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  queryClient.invalidateQueries([`get-available-sluts`]);
  const availableDays = useSelector((state) => state.oneOnOne?.availableDays);
  console.log(availableDays, 'availableDays');
  // useEffect(() => {
  //   queryClient.invalidateQueries([`get-available-sluts`]);
  // },[])
  return (
    <div className="overLayer backgroundGradient">
      <Row align="start" justify="space-between">
        <Row align="middle" className="oneOnOneHeader d-flex d-xl-none">
          <Col>
            <h5>Try One-on-One Learning</h5>
          </Col>
          <Col className="mt-xl-0">
            <div className="oneOnone-price">
              {dollarSign}
              pay
              <span className="perHour"> Per Hour</span>
            </div>
          </Col>
        </Row>
        <Col xl={17} lg={14} className={'ps-0'}>
          <Row
            align="middle"
            className="oneOnOneHeader d-none d-xl-flex align-items-end"
          >
            <Col span={14}>
              <h5>Try One-on-One Learning</h5>
            </Col>
            <Col span={10}>
              <div className="oneOnone-price">
                {dollarSign}
                <span>pay</span>
                <span className="perHour"> Per Hour</span>
              </div>
            </Col>
          </Row>
          <Row className="oneOnOneBody">
            <Col span={24}>
              <p>
                You can contact with instructor to discuss your problem and
                solve it
              </p>
            </Col>
          </Row>
        </Col>
        <Col xl={7} lg={10} style={{ textAlign: '-webkit-right' }}>
          <MainButton
            btnClass={'whiteBtn'}
            text={'Request Appointment'}
            onclick={handleShow}
          />
        </Col>
      </Row>

      <OwnModal
        open={show}
        onCancel={handleClose}
        className="Request-appointment"
        title={'New Appointment'}
      >
        <RequestAppointment
          myCourse={myCourse}
          handleClose={handleClose}
          instructorId={myCourse?.course?.user_id}
        />
      </OwnModal>
    </div>
  );
}

export default OneOnOneSection;

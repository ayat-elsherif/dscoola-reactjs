import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchopenAddLecTypesForm } from '../../../../../../../../features/courseContent/courseContentSlice';
import dayjs from 'dayjs';
import useApi from '../../../../../../../../network/useApi';
import DashboardButton from 'components/common/dashboard/components/button';
import LiveCourseSession from './liveCourseSession';
import WarningMessage from 'helpers/warningMesages';
import { Link } from 'react-router-dom';
import ZoomMeetingHost from './meetingHost/zoomMeetingHost';
import CustomMeetingHost from './meetingHost/customMeetingHost';

export default function LiveSession({ lectuer, sectionId }) {
  const [postLoading, setPostLoading] = useState(false);
  const [zoomType, setzoomType] = useState(2);
  const [value, setValue] = useState(1);
  const [startDate, setStartDate] = useState([]);
  const { RangePicker } = DatePicker;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const api = useApi();
  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  const courseContentInner = useSelector(
    (state) => state.courseContentInner?.courseContentInner,
  );

  const isLive = courseContentInner?.course?.type === 'liveClass';
  const zoomWarningMessage = (
    <span>
      Please complete your meeting settings{' '}
      <Link to="/instructor-dashboard/zoom-settings">here</Link> then add your
      bundles
    </span>
  );

  return (
    <>
      {false ? (
        <LiveCourseSession lectuer={lectuer} sectionId={sectionId} />
      ) : (
        <Form className="live-session-form" layout="vertical">
          {zoomType === 1 && <ZoomMeetingHost />}
          {zoomType === 2 && (
            <CustomMeetingHost lectuer={lectuer} sectionId={sectionId} />
          )}
        </Form>
      )}
    </>
  );
}

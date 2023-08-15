import { useQuery } from '@tanstack/react-query';
import { Col, Row, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { currentBundle } from 'features/courseContent/curentBundle';
import useApi from 'network/useApi';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, InfoIcon } from '../../../../../../../../assets/svg';
import './index.scss';

const StepHeader = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useApi();
  const [selectedOption, setSelectedOption] = useState();

  const pathname = window.location.pathname; //returns the current url minus the domain name
  const course_id = localStorage.getItem('live-course-id');
  console.log(pathname, 'sdcsdcsdc');
  const isLocateInCourseContent =
    pathname === '/instructor-dashboard/courses/add/course-content';
  const courseContentInner = useSelector(
    (state) => state.courseContentInner?.courseContentInner,
  );
  const isLive = courseContentInner?.course?.type === 'liveClass';
  const courseId = localStorage.getItem('live-course-id');

  //lecture/course/353/setup-details/bundle
  const { data: Bundles } = useQuery([`get-bundles`], () => {
    return api.get(
      `lecture/course/${courseId}/setup-details/bundle?order_by=id,asc`,
    );
  });
  // console.log(Bundles, 'dfgverg');
  let bundlesArr = [];
  Bundles?.data?.forEach((item, index) => {
    bundlesArr.push({
      label: dayjs(item.start_date).format('DD, MMM, YYYY'),
      value: item.id,
      index: index,
    });
  });

  return (
    <Row className="step-header">
      <Col>
        <Row gutter={[16]} align="middle">
          <Col>
            {' '}
            <h4>{data?.title}</h4>
          </Col>
          {/* {isLocateInCourseContent && isLive ? (
            <>
              {' '}
              <Col>
                {' '}
                <Select
                  onChange={(value) => dispatch(currentBundle(value))}
                  onSelect={(id, option) => {
                    setSelectedOption(option);
                  }}
                  placeholder="Select Bundle"
                  style={{
                    width: 130,
                  }}
                  options={bundlesArr}
                />
              </Col>
              <Col>
                {' '}
                {selectedOption?.index + 1 ? selectedOption?.index + 1 : '0'}/
                {bundlesArr?.length} Bundles in this Course
              </Col>
              <Col>
                {' '}
                <Tooltip title="Choose your bundles and create your course content after you finish the first bundle, choose another bundle.">
                  <InfoIcon />
                </Tooltip>
              </Col>
            </>
          ) : null} */}
        </Row>
      </Col>

      <Col justify="end">
        {data?.preview && (
          <span
            className="prev-span"
            onClick={() =>
              navigate(`/instuctor-preview/${course_id}`, {
                state: {
                  isPreview: true,
                },
              })
            }
          >
            <EyeIcon />
            Preview
          </span>
        )}
      </Col>
    </Row>
  );
};

export default StepHeader;

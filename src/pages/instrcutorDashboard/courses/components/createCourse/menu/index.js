import React, { useEffect } from 'react';
import { Button, message, Drawer } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { Toggolecon } from '../../../../../../assets/svg/index';
import {
  CompletedStepIcon,
  CompleteIcon,
  NoneCompletedStepIcon,
} from '../../../../../../assets/svg';
import Icon from '../../../../../../components/common/dashboard/components/Icon';
import menuData from '../data.json';
import './index.scss';
import { useSelector } from 'react-redux';
import { newNenuJson } from '../steps/newdata';
import { useState } from 'react';
import useApi from 'network/useApi';
import SweetAlert from 'components/common/dashboard/components/sweetAlert.js';
import useScreens from 'Hooks/ui/useScreens';
const CreateCourseMenu = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const api = useApi();
  const course_id = localStorage.getItem('live-course-id');
  const navigate = useNavigate();
  const { isLg } = useScreens();
  const courseAddPipline = useSelector(
    (state) => state.courseAddPipline.courseAddPipline,
  );
  const allStepsCompleted =
    courseAddPipline?.plan?.course_structure?.completed &&
    courseAddPipline?.plan?.setup?.completed &&
    courseAddPipline?.plan?.goals?.completed &&
    courseAddPipline?.create?.film?.completed &&
    courseAddPipline?.create?.course_content?.completed &&
    courseAddPipline?.publish?.course_pricing?.completed &&
    courseAddPipline?.publish?.course_setting?.completed;

  const onSubmit = () => {
    setLoading(true);
    api
      .post('lecture/course/review-submit', { course_id: course_id })
      .then(() => {
        SweetAlert(
          'Thank You!',
          'You have correctly completed your Course Details , we will review it and you will be notified when it is finished. Please wait for the email',
          '/assets/images/message.png',
        );
        setTimeout(() => {
          navigate(`/instuctor-preview/${course_id}`, {
            state: {
              isPreview: true,
            },
          });
        }, 1000);
        // navigate('/instructor-dashboard/courses');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message.error('something went wrong');
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const allSteps = (
    <div className="create-course-menu">
      <div className="menu-section">
        <h5> Plan your course</h5>

        <NavLink to="course-structure" key={1} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.plan?.course_structure?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Course structure</span>
        </NavLink>

        <NavLink to="setup" key={2} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.plan?.setup?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Course Details</span>
        </NavLink>
        <NavLink to="goals" key={3} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.plan?.goals?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Intended learners</span>
        </NavLink>
      </div>
      <div className="menu-section">
        <h5> Create your content</h5>

        <NavLink to="film" key={4} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.create?.film?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Film & edit</span>
        </NavLink>
        <NavLink to="course-content" key={5} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.create?.course_content?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Course Content</span>
        </NavLink>
        {/* <NavLink to="Subtitles" key={6}>
<Icon
type={
   courseAddPipline?.plan?.goals?.completed
      ? CompleteIcon
      : NoneCompletedStepIcon
}
/>
<span>Subtitles</span>
</NavLink>
<NavLink to="drip-content" key={7}>
<Icon
type={
   courseAddPipline?.plan?.goals?.completed
      ? CompleteIcon
      : NoneCompletedStepIcon
}
/>
<span>Drip Content</span>
</NavLink> */}
      </div>
      <div className="menu-section">
        <h5>Publish your course</h5>
        <NavLink to="course-pricing" key={8} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.publish?.course_pricing?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Course Pricing</span>
        </NavLink>
        <NavLink to="course-setting" key={10} onClick={isLg ? null : onClose}>
          <Icon
            type={
              courseAddPipline?.publish?.course_setting?.completed
                ? CompleteIcon
                : NoneCompletedStepIcon
            }
          />
          <span>Course Settings</span>
        </NavLink>
      </div>
    </div>
  );
  return (
    <>
      {!isLg && (
        <div className="create-course-menu-small">
          <Toggolecon onClick={showDrawer} />
          {/* <Button type="primary" >
            Open
          </Button> */}
          <Button
            className="btn-course-submit"
            onClick={onSubmit}
            disabled={!allStepsCompleted}
            loading={loading}
          >
            Submit For Review
          </Button>
          <Drawer
            // title="Basic Drawer"
            placement="left"
            onClose={onClose}
            open={open}
            rootClassName="course-steps-drawer"
          >
            {allSteps}
          </Drawer>
        </div>
      )}
      {isLg && allSteps}
    </>
  );
};

export default CreateCourseMenu;

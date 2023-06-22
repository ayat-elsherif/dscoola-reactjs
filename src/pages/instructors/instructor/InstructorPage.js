import React from 'react';
import InstructorBio from './UserBio';
import InstructorCourses from './InstructorCourses';
import { useParams } from 'react-router-dom';
import '../instructors.scss';
import UserProfileServices from '../../../services/UserProfile';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import useApi from 'network/useApi';
function InstructorPage() {
  window.scroll(0, 0);
  const { id } = useParams();
  const api = useApi();

  const getInstructorProfile = (id) => {
    return UserProfileServices.getInstructorProfile(id);
  };
  const getInstructorWebinar = (id) => {
    return api.get(`webinar?user_id=${id}`);
  };

  const { data: instructorData, isLoading } = useQuery(
    [`instructor-profile`],
    () => getInstructorProfile(id),
  );
  const { data: instructorWebinar } = useQuery([`instructor-webinar`], () =>
    getInstructorWebinar(id),
  );

  return (
    <>
      {isLoading ? (
        <Skeleton
          className="container userBio"
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <div className="instructor-page-container">
          <InstructorBio
            instractorProfileData={instructorData?.data?.user}
            userTitle={'Instructor'}
            param1={'Total Students'}
            param2="Reviews"
          />

          <InstructorCourses
            instructorData={instructorData}
            instructorId={id}
            instructorWebinar={instructorWebinar}
          />
        </div>
      )}
    </>
  );
}

export default InstructorPage;

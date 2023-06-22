import React from 'react';
import StatisticsCard from './statisticsCard';

const Courses = ({ data }) => {
  return (
    <>
      <h3 className='dashboard-page-title'>Dscoola Courses</h3>
      <div className='row'>
        {data?.map((course, index) => {
          return (
            <div className='col-md-4' key={index}>
              <StatisticsCard Icon={course.icon} data={course.data} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Courses;

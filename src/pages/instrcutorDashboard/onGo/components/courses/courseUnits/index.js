import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppliedIcon,
  ArrowIcon,
  BackArrowIcon,
} from '../../../../../../assets/svg';
import { coursesUnits } from './data';
import './index.scss';

const CourseUnits = () => {
  let navigate = useNavigate();
  return (
    <div className='course-units'>
      <div className='course-units_header'>
        <div className='title'>
          On GO Courses <ArrowIcon />{' '}
          <span>Flutter & Dart - The Complete Guide [2022 Edition]</span>
        </div>
        <div className='back' onClick={() => navigate(-1)}>
          <BackArrowIcon /> Back
        </div>
      </div>
      <div className='course-units_body'>
        {coursesUnits?.map((unite) => {
          return (
            <div className='unite-card' key={unite.id}>
              <div className='unite-banner'>
                <img src={unite.photo} alt='unite-banner' />{' '}
              </div>
              <div className='unite-info'>
                <h4>{unite.title}</h4>
                <p>{unite.desc}</p>
                <>
                  {unite.applied ? (
                    <div className='applied'>
                      <AppliedIcon /> Applied
                    </div>
                  ) : (
                    <div className='not-applied'>Apply on this unit</div>
                  )}
                </>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseUnits;

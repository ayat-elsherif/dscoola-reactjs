import React from 'react';
import { Link } from 'react-router-dom';
import { CoursestatusIcon } from '../../../../../assets/svg';
import ItemMember from '../members';
import './index.scss';
const CourseCard = ({ data }) => {
  return (
    <div className='course-card'>
      <div className='card-header'>
        <img src={data?.photo} alt='course-banner' />
        <div className='unit-view'>
          <Link to={`${data.id}/units`}>View Units</Link>
        </div>
      </div>
      <div className='card-body'>
        <div className='status-units'>
          <div className='status'>
            <CoursestatusIcon />
            <span>{data?.status}</span>
          </div>
          <div className='units'>
            <CoursestatusIcon />
            <span>{data?.units} Units</span>
          </div>
        </div>
        <h4>{data?.title}</h4>
        <p>{data?.desc}</p>
        <ItemMember members={data?.members} />
      </div>
    </div>
  );
};

export default CourseCard;

import React from 'react';
import { AvalibalePointsIcon } from '../../../../../../assets/svg';
import './index.scss';
import usePointsBalance from 'api-hooks/points/usePointsBalance';
import { Skeleton } from 'antd';
const PointCard = ({ total_cash, total_points }) => {
  // const { data, isLoading } = usePointsBalance();
  return (
    <div className="point-card">
      <AvalibalePointsIcon />
      <div className="points-discount">
        Points : <span>{total_points}</span>
        {/* {isLoading ? <Skeleton.Input active /> : <span>{data?.native}</span>} */}
      </div>
      <div className="points-discount">
        Discount : $ <span>{total_cash}</span>
        {/* {isLoading ? <Skeleton.Input active /> : <span>{data?.shorthand}</span>} */}
      </div>
    </div>
  );
};

export default PointCard;

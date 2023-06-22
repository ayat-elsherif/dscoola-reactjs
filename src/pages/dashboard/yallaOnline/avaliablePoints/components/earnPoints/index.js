import React from 'react';
import {
  AvalibalePointsIcon,
  EarnPointsIcon,
} from '../../../../../../assets/svg';
import './index.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const PointEarnCard = () => {
  return (
    <div className="point-earn-card">
      <div className="point-earn-details">
        <h3>Earn Your Points</h3>
        <p>You can get 50 points equal to $5 for each meeting you create</p>
        <Link to="/yallaonline">
          <Button type="primary">Let`s Start Now</Button>
        </Link>
      </div>

      <EarnPointsIcon />
    </div>
  );
};

export default PointEarnCard;

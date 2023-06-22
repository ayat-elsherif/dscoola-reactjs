import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';

const getLogo = (large) => {
  if (large) {
    return '/assets/images/logo-dashboard.png';
  }
  return '/assets/images/logo-collapsed.png';
};

export const Logo = ({ large }) => {
  const LogoStyles = css`
    display: flex;
    align-items: flex-end;
    height: 7.1rem;
    margin-bottom: 5rem;
    padding: ${large ? '0 2.6rem' : '0 1.4rem'};
    img {
      width: ${large ? '11rem' : '5.3rem'};
      height: ${large ? '3.8rem' : '2.7rem'};
      cursor: pointer;
    }
  `;

  const navigate = useNavigate();
  return (
    <div className={LogoStyles}>
      <Link to="/">
        <img src={getLogo(large)} alt={`logo`} />
      </Link>
    </div>
  );
};

export default Logo;

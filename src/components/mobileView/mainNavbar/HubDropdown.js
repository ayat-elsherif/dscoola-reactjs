import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import { css } from '@emotion/css';

import OneOnOneMenuIcon from '../../../assets/svg/OneOnOneMenuIcon';
import ScoolaTalksMenuIcon from '../../../assets/svg/ScoolaTalksMenuIcon';
// import YallaOnlineHome from '../../../assets/svg/YallaonlineHome';
import YallaOnlineMenuIcon from '../../../assets/svg/YallaOnlineMenuIcon';
import NavbarLogo from '../../../assets/svg/NavbarLogo';

// import styles from "./mainNavbar.Module.scss";
export default function HubDropdown() {
  const items = [
    {
      label: (
        <Link to="/oneonone">
          <div className="menu-item">
            <OneOnOneMenuIcon />
            One-on-One
          </div>
        </Link>
      ),
      key: 0,
    },
    {
      label: (
        <Link to="/yallaonline">
          <div className="menu-item">
            <YallaOnlineMenuIcon />
            Yalla Online
          </div>
        </Link>
      ),
      key: 1,
    },
    {
      label: (
        <Link to="/alltalks">
          <div className="menu-item">
            <ScoolaTalksMenuIcon />
            Scoola Talks
          </div>
        </Link>
      ),
      key: 2,
    },
  ];
  const fixedPosition = css`
    position: fixed;
    bottom: 80px;
    left: 0;
  `;
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="top"
        overlayClassName={`${fixedPosition} hub-menu`}
      >
        <div className={`navbar-logo navbar-item`}>
          <div className={'hub-container'}>
            <NavbarLogo /> Hub
          </div>
        </div>
      </Dropdown>

      {/* <div className="hub-menu"></div> */}
    </>
  );
}

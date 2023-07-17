import { Link } from 'react-router-dom';
import React from 'react';
import OneOnOneMenuIcon from '../../../assets/svg/OneOnOneMenuIcon';
import ScoolaTalksMenuIcon from '../../../assets/svg/ScoolaTalksMenuIcon';
// import YallaOnlineHome from '../../../assets/svg/YallaonlineHome';
import YallaOnlineMenuIcon from '../../../assets/svg/YallaOnlineMenuIcon';
// import styles from "./mainNavbar.Module.scss";
export default function HubDropdown({ isMenuClicked }) {
  if (isMenuClicked) {
    return (
      <div className="hub-menu">
        <Link to="/oneonone">
          <div className="menu-item">
            <OneOnOneMenuIcon />
            One-on-One
          </div>
        </Link>
        <Link to="/yallaonline">
          <div className="menu-item">
            <YallaOnlineMenuIcon />
            Yalla Online
          </div>
        </Link>
        <Link to="/alltalks">
          <div className="menu-item">
            <ScoolaTalksMenuIcon />
            Scoola Talks
          </div>
        </Link>
      </div>
    );
  }
}

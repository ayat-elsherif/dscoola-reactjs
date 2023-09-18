import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from '../../../../common/navbar/Navbar';
import Footer from '../../../../common/footer';
import Header from 'components/layout/Header/Header';
import MainNavbar from 'components/mobileView/mainNavbar/MainNavbar';
import useScreens from 'Hooks/ui/useScreens';
import { useLocation } from 'react-router-dom';
function Main() {
  const { isLg } = useScreens(); // < 992
  const location = useLocation().pathname;
  return (
    <div className="website-wrapper">
      <Header />
      <div className="website-main-holder">
        <Outlet />
      </div>

      <Footer />
      {!isLg && !location.includes('/course-view') && <MainNavbar />}
    </div>
  );
}

export default Main;

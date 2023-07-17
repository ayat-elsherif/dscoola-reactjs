import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from '../../../../common/navbar/Navbar';
import Footer from '../../../../common/footer';
import Header from 'components/layout/Header/Header';
import MainNavbar from 'components/mobileView/mainNavbar/MainNavbar';
import useScreens from 'Hooks/ui/useScreens';

function Main() {
  const { isLg } = useScreens(); // < 992
  console.log(isLg, 'isLg');
  return (
    <div className="website-wrapper">
      <Header />
      <div className="website-main-holder">
        <Outlet />
      </div>

      <Footer />
      {!isLg && <MainNavbar />}
    </div>
  );
}

export default Main;

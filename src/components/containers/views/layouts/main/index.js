import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from '../../../../common/navbar/Navbar';
import Footer from '../../../../common/footer';
import Header from 'components/layout/Header/Header';

function Main() {
  return (
    <div className="website-wrapper">
      <Header />
      <div className="website-main-holder">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main;

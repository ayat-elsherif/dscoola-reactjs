import { Layout } from 'antd';
import React, { useState } from 'react';
import SideNav from '../../../../common/dashboard/layout-components/sidenav/SideNav';
import utils from '../../../../../utils';
import { Outlet, useLocation } from 'react-router-dom';
import navigationConfig from '../../../../common/dashboard/configs/NavigationConfig';

import MobileNav from '../../../../common/dashboard/layout-components/MobileNav';
import HeaderNav from '../../../../common/dashboard/layout-components/headerNav';
import '../../../../../assets/scss/dashboatd.scss';
// import Header from 'components/layout/Header/Header';
import useScreens from 'Hooks/ui/useScreens';
import MainNavbar from 'components/mobileView/mainNavbar/MainNavbar';
const { Content, Header, Sider } = Layout;

const Dashboard = () => {
  const location = useLocation();

  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname,
  );

  const { isLg, isXl } = useScreens();
  const lgHandler = () => {
    if (isXl) return 80;
    else return 0;
  };
  const sliderWidths = {
    width: 241,
    collapsedWidth: lgHandler(),
  };
  const [isSiderOpen, setIsSiderOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleCollapsed = () => {
    setIsSiderOpen(false);
    setIsDrawerOpen(false);
  };
  return (
    <Layout hasSider>
      <SideNav
        isOpen={isSiderOpen}
        isDrawerOpen={isDrawerOpen}
        sliderWidths={sliderWidths}
        routeInfo={currentRouteInfo}
        handleCollapsed={handleCollapsed}
      />
      <Layout
        className="site-layout"
        style={{
          marginLeft: isXl
            ? isSiderOpen
              ? sliderWidths.width
              : sliderWidths.collapsedWidth
            : sliderWidths.collapsedWidth,
        }}
      >
        <HeaderNav
          isMobile={!isLg}
          setIsSiderOpen={isXl ? setIsSiderOpen : setIsDrawerOpen}
        />
        <div className="dashboard-content">
          <Content style={{ width: `100%` }}>
            <Outlet />
          </Content>
        </div>
      </Layout>
      <MobileNav routeInfo={currentRouteInfo} />
      {/* {!isLg && <MobileNav routeInfo={currentRouteInfo} />} */}
      {!isLg && <MainNavbar />}
    </Layout>
  );
};

export default Dashboard;

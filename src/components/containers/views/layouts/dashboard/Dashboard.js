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
const { Content, Header, Sider } = Layout;

const sliderWidths = {
  width: 241,
  collapsedWidth: 80,
};
const Dashboard = () => {
  const location = useLocation();

  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname,
  );

  const { isLg } = useScreens();
  const [isSiderOpen, setIsSiderOpen] = useState(true);

  return (
    <Layout hasSider>
      <SideNav
        isOpen={isSiderOpen}
        sliderWidths={sliderWidths}
        routeInfo={currentRouteInfo}
      />
      <Layout
        className="site-layout"
        style={{
          marginLeft: isSiderOpen
            ? sliderWidths.width
            : sliderWidths.collapsedWidth,
        }}
      >
        <HeaderNav isMobile={!isLg} setIsSiderOpen={setIsSiderOpen} />
        <div className="dashboard-content">
          <Content style={{ width: `100%` }}>
            <Outlet />
          </Content>
        </div>
      </Layout>
      <MobileNav routeInfo={currentRouteInfo} />
      {/* {!isLg && <MobileNav routeInfo={currentRouteInfo} />} */}
    </Layout>
  );
};

export default Dashboard;

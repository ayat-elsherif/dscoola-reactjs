import React from 'react';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from '../menuContent/MenuContent';
import './SideNve.scss';
import Logo from '../logo';
const { Sider } = Layout;

export const SideNav = ({
  isOpen,
  sliderWidths,
  routeInfo,
  localization = true,
}) => {
  const props = { routeInfo, localization };

  return (
    <Sider
      className="side-nav"
      width={sliderWidths.width}
      collapsedWidth={sliderWidths.collapsedWidth}
      collapsed={!isOpen}
    >
      <Logo large={isOpen} />
      <Scrollbars autoHide style={{ height: 'calc(100vh - 121px)' }}>
        <MenuContent {...props} />
      </Scrollbars>
    </Sider>
  );
};

export default SideNav;
// const mapStateToProps = ({ theme }) => {
//   const { navCollapsed, sideNavTheme } = theme;
//   return { navCollapsed, sideNavTheme };
// };

// export default connect(mapStateToProps)(SideNav);

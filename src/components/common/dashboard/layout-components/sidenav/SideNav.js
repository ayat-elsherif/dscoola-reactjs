import React from 'react';
import { Layout, Button, Drawer } from 'antd';

import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from '../menuContent/MenuContent';
import './SideNve.scss';
import Logo from '../logo';
import useScreens from 'Hooks/ui/useScreens';
const { Sider } = Layout;

export const SideNav = ({
  isOpen,
  isDrawerOpen,
  sliderWidths,
  routeInfo,
  localization = true,
  handleCollapsed,
}) => {
  const props = { routeInfo, localization };
  const { isLg, isXl } = useScreens();
  return (
    <>
      {isXl ? (
        <Sider
          className="side-nav"
          width={sliderWidths.width}
          collapsedWidth={sliderWidths.collapsedWidth}
          collapsed={!isOpen}
        >
          <div className="side-nav-header">
            <Logo large={isOpen} />
            {!isXl && (
              <div
                className="side-nav-close"
                style={{ color: '#fff' }}
                onClick={handleCollapsed}
              >
                X
              </div>
            )}
          </div>
          <Scrollbars autoHide style={{ height: 'calc(100vh - 121px)' }}>
            <MenuContent {...props} />
          </Scrollbars>
        </Sider>
      ) : (
        <Drawer
          title={<Logo large={true} />}
          placement="left"
          onClose={handleCollapsed}
          open={isDrawerOpen}
          rootClassName="side-nav drawer-side-nav"
          contentWrapperStyle={{ width: '290px' }}
        >
          <MenuContent {...props} handleCollapsed={handleCollapsed} />
        </Drawer>
      )}
    </>
  );
};

export default SideNav;
// const mapStateToProps = ({ theme }) => {
//   const { navCollapsed, sideNavTheme } = theme;
//   return { navCollapsed, sideNavTheme };
// };

// export default connect(mapStateToProps)(SideNav);

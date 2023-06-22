import React from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NAV_TYPE_SIDE } from '../constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './menuContent/MenuContent';
import { onMobileNavToggle } from '../../../../features/theme/ThemeSlice';
// import Logo from './Logo';
import Flex from '../shared-components/Flex';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Logo from './logo';

export const MobileNav = ({ routeInfo, localization = true }) => {
  const props = { routeInfo, localization };
  const { mobileNav } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(onMobileNavToggle(false));
  };

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={mobileNav}
      bodyStyle={{ padding: 5 }}
    >
      <Flex flexDirection="column" className="h-100">
        <Flex justifyContent="between" alignItems="center">
          <Logo mobileLogo={true} />
          <div className="nav-close" onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </Flex>
        <div className="mobile-nav-menu">
          <Scrollbars autoHide>
            <MenuContent type={NAV_TYPE_SIDE} {...props} />
          </Scrollbars>
        </div>
      </Flex>
    </Drawer>
  );
};

export default MobileNav;

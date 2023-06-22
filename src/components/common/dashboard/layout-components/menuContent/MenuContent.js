import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Grid } from 'antd';
import Icon from '../../components/Icon';
import navigationConfig from '../../configs/NavigationConfig';
import { useDispatch } from 'react-redux';
import { NAV_TYPE_SIDE } from '../../constants/ThemeConstant';
import utils from '../../../../../utils';
import { onMobileNavToggle } from '../../../../../features/theme/ThemeSlice';
import './index.scss';
import checkRole from '../../../../../Hooks/checkRole';
import { LogoutIcon } from 'assets/svg';
import LogoutModal from '../../components/logoutModal';

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = '';
  if (key) {
    const arr = key.split('-');
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
  const { routeInfo, hideGroupTitle } = props;
  const [isModLogoutVis, setIsModLogoutVis] = useState(false);
  const dispatch = useDispatch();
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const closeMobileNav = () => {
    if (isMobile) {
      dispatch(onMobileNavToggle(false));
    }
  };

  return (
    <>
      <Menu
        theme={'light'}
        mode="inline"
        style={{ borderRight: 0 }}
        defaultSelectedKeys={[routeInfo?.key]}
        defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
        className={hideGroupTitle ? 'hide-group-title' : ''}
      >
        {navigationConfig.map((menu) =>
          menu.submenu.length > 0 ? (
            <Menu.ItemGroup key={menu.key} title={menu.title}>
              {menu.submenu.map((subMenuFirst) => {
                if (checkRole(subMenuFirst.role)) {
                  return subMenuFirst.submenu.length > 0 ? (
                    <SubMenu
                      icon={
                        subMenuFirst.icon ? (
                          <Icon type={subMenuFirst?.icon} />
                        ) : null
                      }
                      key={subMenuFirst.key}
                      title={subMenuFirst.title}
                    >
                      {subMenuFirst.submenu.map((subMenuSecond) => (
                        <Menu.Item key={subMenuSecond.key}>
                          {subMenuSecond.icon ? (
                            <span className="sid-icon">
                              <Icon type={subMenuSecond?.icon} />
                            </span>
                          ) : null}
                          <span>{subMenuSecond.title}</span>
                          <Link
                            onClick={() => closeMobileNav()}
                            to={subMenuSecond.path}
                          />
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={subMenuFirst.key}>
                      {subMenuFirst.icon ? (
                        <span className="sid-icon">
                          <Icon type={subMenuFirst.icon} />
                        </span>
                      ) : null}
                      <span>{subMenuFirst.title}</span>
                      <Link
                        onClick={() => closeMobileNav()}
                        to={subMenuFirst.path}
                      />
                    </Menu.Item>
                  );
                }
              })}
            </Menu.ItemGroup>
          ) : checkRole(menu.role) ? (
            <Menu.Item key={menu.key}>
              {menu.icon ? (
                <span className="sid-icon">
                  <Icon type={menu?.icon} />
                </span>
              ) : null}
              <span>{menu?.title}</span>
              {menu.path ? (
                <Link onClick={() => closeMobileNav()} to={menu.path} />
              ) : null}
            </Menu.Item>
          ) : null,
        )}
        <Menu.Item onClick={() => setIsModLogoutVis(true)}>
          <span className="sid-icon">
            <Icon type={LogoutIcon} />
          </span>
          <span>Logout</span>
        </Menu.Item>
      </Menu>
      <LogoutModal
        isOpen={isModLogoutVis}
        cancel={() => setIsModLogoutVis(false)}
      />
    </>
  );
};

const MenuContent = (props) => {
  return <SideNavContent {...props} />;
};

export default MenuContent;

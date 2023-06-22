import React from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { Toggolecon } from 'assets/svg';
import CartMenu from 'components/layout/Header/CartMenu/CartMenu';
import NotificationMenu from 'components/layout/Header/NotificationMenu/NotificationMenu';
import UserMenu from 'components/layout/Header/UserMenu/UserMenu';
import './index.scss';

const { Header } = Layout;

export const HeaderNav = ({ setIsSiderOpen }) => {
  return (
    <Header className="app-header">
      <Row justify="space-between" align="middle">
        <Col>
          <div className="nav-left">
            <Button
              type="link"
              icon={<Toggolecon />}
              onClick={() => setIsSiderOpen((prev) => !prev)}
            />
          </div>
        </Col>
        <Col>
          <div className="nav-right">
            <CartMenu />
            <NotificationMenu />
            <UserMenu dashboard />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderNav;

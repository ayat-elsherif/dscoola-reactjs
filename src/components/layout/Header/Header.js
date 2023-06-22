import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert, Button, message } from 'antd';
import logo from 'logo.svg';
import { HeartIcon } from 'assets/svg';
import talksIco from 'assets/images/talks.gif';
import { useVerify } from 'components/login/hooks/useLogin';
import CategoriesMenu from './CategoriesMenu/CategoriesMenu';
import SearchBar from './SearchBar/SearchBar';
import CartMenu from './CartMenu/CartMenu';
import NotificationMenu from './NotificationMenu/NotificationMenu';
import UserMenu from './UserMenu/UserMenu';
import './Header.scss';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state?.user);

  const onSuccsses = (data) => {
    message.success(
      'Check Your Email! we have send you a confirmation email',
      5,
    );
  };
  const onFail = () => {};
  const { mutate, isLoading } = useVerify(onSuccsses, onFail);

  const onVerify = () => {
    mutate();
  };

  return (
    <>
      <div className="main-header-wrapper">
        <div className="container-fluid">
          <ul className="nav-wrapper">
            <li className="brand-wrapper">
              <Link to="/">
                <img src={logo} alt="scoola" />
              </Link>
            </li>
            <li>
              <CategoriesMenu />
            </li>
            <li className="search-wrapper">
              <SearchBar />
            </li>
            {!currentUser?.isUserInstractor && (
              <li>
                {+currentUser?.role_id !== 2 && (
                  <Link to="/become-instructor" className="header-link">
                    Become an instructor
                  </Link>
                )}
              </li>
            )}
            <li>
              <Link to="/rythm" className="header-link">
                RYTHM
              </Link>
            </li>
            <li className="talks-wrapper">
              <Link to="/webinars" className="header-link">
                <img
                  src={talksIco}
                  alt="live session"
                  style={{ width: '2.2rem' }}
                />
                Talks
              </Link>
            </li>

            {currentUser && (
              <li>
                <Link
                  to={
                    +currentUser?.role_id === 2
                      ? '/instructor-dashboard/my-wishlist'
                      : '/student-dashboard/my-wishlist'
                  }
                >
                  <Button
                    type="link"
                    className="typ-btn-icon"
                    icon={<HeartIcon />}
                  />
                </Link>
              </li>
            )}

            <li>
              <CartMenu />
            </li>

            {!!currentUser && (
              <li>
                <NotificationMenu />
              </li>
            )}

            <li>
              <UserMenu />
            </li>
          </ul>
        </div>
      </div>

      {currentUser && !currentUser?.isVerified && (
        <Alert
          message={
            <p>
              your email address is not verified yet !! click
              <Button
                loading={isLoading}
                type="link"
                onClick={onVerify}
                style={{
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                here
              </Button>
              to verify
            </p>
          }
          banner
        />
      )}
    </>
  );
}

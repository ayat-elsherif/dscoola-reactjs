import React from 'react';
import './breadcrumbs.scss';
import { Link } from 'react-router-dom';
import { Button, Breadcrumb } from 'antd';
function BreadCrumbs({
  param,
  title,
  txt,
  callToActionButton,
  buttonText,
  buttonAction,
  heroImg,
}) {
  return (
    // <div className="layout-hero-holder">
    <div className="layout-hero-holder">
      <div className="container">
        {/* <Breadcrumb>
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <Breadcrumb.Item active>{param}</Breadcrumb.Item>
        </Breadcrumb> */}
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            {' '}
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{param}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-between">
          <div>
            <h2>{title}</h2>
            <p>{txt}</p>
            {callToActionButton ? (
              <Button
                style={{
                  marginTop: '1rem',
                }}
                onClick={buttonAction}
                type="primary"
              >
                {buttonText}
              </Button>
            ) : (
              ''
            )}
          </div>
          {heroImg ? heroImg : ''}
        </div>
      </div>
    </div>
  );
}

export default BreadCrumbs;

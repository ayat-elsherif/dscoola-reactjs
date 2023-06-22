import React from 'react';
import './breadcrumbs.scss';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button } from 'antd';
function BreadCrumbsMultiple({
  params,
  title,
  txt,
  callToActionButton,
  buttonText,
  heroImg,
  socialMedia,
  alignEnd,
  children,
}) {
  return (
    <div className="layout-hero-holder">
      <div className="container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            {' '}
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {params.map((param, i) =>
            i === params.length - 1 || params.length === 0 ? (
              <Breadcrumb.Item>
                {param?.label?.replaceAll('-', ' ')}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={i}>
                {' '}
                <Link to={param.url}>{param?.label?.replaceAll('-', ' ')}</Link>
              </Breadcrumb.Item>
            ),
          )}
        </Breadcrumb>
        {title || txt || callToActionButton || heroImg ? (
          <div
            className={
              alignEnd
                ? 'd-flex justify-content-between align-items-end'
                : 'd-flex justify-content-between'
            }
          >
            {/* className="Breadcrumb-body" for that div */}
            <div>
              <h2>{title?.replaceAll('-', ' ')}</h2>
              <p>{txt}</p>
              {callToActionButton ? (
                <Button
                  style={{
                    marginTop: '1rem',
                  }}
                >
                  {buttonText}
                </Button>
              ) : (
                ''
              )}
            </div>
            {heroImg ? heroImg : ''}
            {socialMedia ? socialMedia : ''}
          </div>
        ) : (
          ''
        )}
        {children}
      </div>
    </div>
  );
}

export default BreadCrumbsMultiple;

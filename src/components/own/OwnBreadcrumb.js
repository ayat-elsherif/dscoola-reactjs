import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { ArrowRightIcon } from 'assets/svg';

// [{path:'/all', label:'all moodboards', stopPath: true}]
// ['all',{path:'/my',label:'my moodboards'}]

function OwnBreadcrumb({ separator, routes = [], current, ...rest }) {
  const OwnBreadcrumbStyles = css`
    padding: 2.6rem 0;
    ol {
      /* justify-content: center; */
    }

    span {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2rem;
      color: #7e59d1;
    }

    .history {
      a,
      span {
        color: #7e59d1;
        &:hover {
          background-color: transparent !important;
        }
      }
    }

    .current {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2rem;
      color: #6a6f73;
    }

    .ant-breadcrumb-separator {
      margin-inline: 0.5rem;
      font-size: 100%;
      svg {
        height: 1rem;
        width: 1rem;
      }
      // margin: 0 0.3rem;
    }
  `;
  return (
    <Breadcrumb
      className={OwnBreadcrumbStyles}
      separator={separator || <ArrowRightIcon />}
      {...rest}
    >
      <Breadcrumb.Item className="history">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>

      {routes?.map((route, i) => (
        <Breadcrumb.Item key={i} className="history">
          {route?.stopPath ? (
            <span>{route?.label}</span>
          ) : (
            <Link to={route?.path || ''}>{route?.label}</Link>
          )}
        </Breadcrumb.Item>
      ))}

      <Breadcrumb.Item className="current">{current}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default OwnBreadcrumb;

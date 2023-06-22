import React from 'react';
import { Spin } from 'antd';
import { css } from '@emotion/css';

const OwnLoading = () => {
  const OwnLoadingStyles = css`
    /* background-color: #ff000032; */
    width: 100%;
    min-height: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
    <div className={OwnLoadingStyles}>
      <Spin size="large" className="spin" wrapperClassName="cc" />
    </div>
  );
};

export default OwnLoading;

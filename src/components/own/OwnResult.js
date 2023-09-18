import { Result } from 'antd';
import React from 'react';
import { css, cx } from '@emotion/css';
import { SearchNotFoundIcon } from 'assets/svg';

function OwnResult({
  icon,
  iconWidth,
  title,
  extra,
  search,
  className,
  ...rest
}) {
  const OwnResultStyles = css`
    width: 62ch;
    max-width: 100%;
    margin: auto;

    .ant-result-title {
      font-weight: 500;
      font-size: 2rem;
      line-height: 2.4rem;
      color: #2a2a2a;
      text-align: center;
    }
    .ant-result-extra {
      font-size: 1.6rem;
      line-height: 2.6rem;
      color: #6a6f73;
      text-align: center;
      margin-top: 1.6rem;
    }

    .ant-result-icon {
      margin-bottom: 2.5rem;
      span {
        font-size: 5rem;
      }
    }
    @media screen and (max-width: 767px) {
      width: 42ch;
    }
  `;
  return (
    <Result
      icon={icon ?? <SearchNotFoundIcon width={iconWidth || 114} />}
      title={title}
      extra={extra}
      className={cx(OwnResultStyles, className)}
      {...rest}
    />
  );
}

export default OwnResult;

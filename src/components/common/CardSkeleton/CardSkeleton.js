import { css } from '@emotion/css';
import { Skeleton } from 'antd';
import React from 'react';

export default function CardSkeleton() {
  const CardSkeletonStyles = css`
    width: 27rem;
    max-width: 100%;
    height: 100%;
    /* min-height: 37.1rem; */
    min-height: 38rem;
    overflow: hidden;
    /* background-color: #efefef; */
    box-shadow: 0px 0.3rem 0.6rem #00000029;
    border-radius: 0.8rem;
    /* margin: 0 2rem; */
    .sk-img {
      width: 100% !important;
      height: 13.9rem !important;
      margin-bottom: 2rem;
    }
    .sk-text {
      padding: 0 1.2rem;
    }
  `;
  return (
    <div className={CardSkeletonStyles}>
      <Skeleton.Image className="sk-img" />
      <Skeleton paragraph={{ rows: 4 }} active className="sk-text" />
    </div>
  );
}

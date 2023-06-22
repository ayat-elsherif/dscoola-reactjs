import { css } from '@emotion/css';
import { Spin } from 'antd';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

function QueryLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const QueryLoadingStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    padding: 4rem;
    /* background-color: rgba(0, 0, 0, 0.1); */
    /* backdrop-filter: blur(1.5px); */

    /* display: ${isFetching || isMutating ? 'flex' : 'none'}; */
    display: ${isMutating ? 'flex' : 'none'};
    /* display: ${isMutating ? 'flex' : 'none'}; */
    /* align-items: center; */
    justify-content: center;

    .spin {
      /* .ant-spin-dot-item {
        background-color: dodgerblue;
        background-color: #9440f5; */
      /* } */
      .ant-spin-text {
        /* padding: 2rem 1rem;
        font-size: 2.4rem;
        color: #fff; */
      }
    }
  `;
  return (
    <div className={QueryLoadingStyles}>
      {/* <Spin
        size="large"
        // tip="Loading"

        className="spin"
      /> */}
    </div>
  );
}

export default QueryLoading;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Pagination } from 'antd';
import React from 'react';
import { css, cx } from '@emotion/css';
import useSearchQuery from 'Hooks/utils/useSearchQuery';

function OwnPagination({
  // total,
  // pageSize,
  // justify,
  // style,
  // current,
  // onChange,
  pagination,
  onChange,
  jumbBtns,
  hideOnSinglePage,
  className,
  ...rest
}) {
  // console.log('pagination', pagination);
  const OwnPaginationStyles = css`
    margin: 6rem 0 2rem;
    display: flex;
    justify-content: center;
    li.ant-pagination-item {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      /* background: #d9d9d9; */
      /* display: flex;
      align-items: center;
      justify-content: center; */

      font-weight: 500;
      font-size: 1.5rem;
      line-height: 3.2rem;
      text-align: center;
      color: #2a2a2a;

      /* .btn {
        font-size: 1.6rem;
        line-height: 2rem;
        text-align: center;
        color: #2a2a2a;

        img {
          width: 1.6rem;
        }
      } */

      &.ant-pagination-item-active {
        background: #7e59d1;
        a {
          color: #fff !important;
        }
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      display: none;
    }
  `;
  // const itemRender = (_, type, originalElement) => {
  //   if (type === 'prev') {
  //     return (
  //       <a className="btn">
  //         <img src={arrL} alt="arrow left" />
  //       </a>
  //     );
  //   }

  //   if (type === 'next') {
  //     return (
  //       <a className="btn">
  //         <img src={arrR} alt="arrow right" />
  //       </a>
  //     );
  //   }

  //   return originalElement;
  // };

  const { searchQueryObj, setSearchQuery } = useSearchQuery();
  const onChangeInner = (page) => {
    // console.log('onChange  page', page);
    const queryObj = { ...searchQueryObj };
    queryObj.page = page;
    setSearchQuery(queryObj);
    return null;
  };
  return (
    <Pagination
      total={pagination?.total}
      current={pagination?.currentPage || 1}
      pageSize={pagination?.perPage || 10}
      onChange={onChange || onChangeInner}
      showSizeChanger={false}
      // itemRender={itemRender}
      hideOnSinglePage={hideOnSinglePage ?? true}
      className={cx(OwnPaginationStyles, className)}
      // showQuickJumper
      // showPrevNextJumpers
      {...rest}
    />
  );
}

export default OwnPagination;

// const [pagination, setPagination] = useState({});
// const [curPage, setCurPage] = useState(1);
// const onChangePage = (cur, pageSize) => {
//   setCurPage(cur);
//   fetchList(cur);
// };
// <OwnPagination
//   total={pagination.total}
//   pageSize={pagination.size}
//   current={curPage}
//   onChange={onChangePage}
//   justify="end"
// />;

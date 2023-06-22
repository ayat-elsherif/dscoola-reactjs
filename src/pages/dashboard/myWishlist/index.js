import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Grid, Row } from 'antd';

import './index.scss';
import CourseCard from '../../../helpers/cards/courseCard/courseCard';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import Utils, { crtArray } from '../../../utils';
import { useGetMyWishList } from './hooks/useWishList';
import { Link } from 'react-router-dom';
import { ceil } from 'lodash';
import CardSkeleton from 'components/common/CardSkeleton/CardSkeleton';
import { useQueryClient } from '@tanstack/react-query';
import OwnPagination from 'components/own/OwnPagination';

const { useBreakpoint } = Grid;

const MyWishlist = () => {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const queryClient = useQueryClient();

  const isxxlap = screens.includes('xxl');
  const levels = useSelector((state) => state.allLevels);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const handleChange = (page) => {
    setPage(page);
  };
  const {
    data: myWishList,
    isLoading,
    isFetching,
  } = useGetMyWishList(page, search);

  return (
    <div className="my-wishlist">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">My Wishlist</h3>
          <p>You have total {myWishList?.data?.length} course</p>
        </div>
        <div className="page-header-right">
          <SearchInput
            callback={(searchValue) => {
              setSearch(searchValue);
            }}
            reset={search}
          />
        </div>
      </div>
      {isFetching ? (
        <Row gutter={!isxxlap ? [30, 30] : [26, 26]}>
          {crtArray(4).map((i, index) => {
            return (
              <Col xs={24} sm={24} md={6} xxl={6} key={index}>
                <CardSkeleton />
              </Col>
            );
          })}
        </Row>
      ) : (
        <>
          {myWishList?.data?.length > 0 ? (
            <div className="wish-list-wrapper">
              <Row gutter={!isxxlap ? [30, 30] : [26, 26]}>
                {myWishList?.data.map((item, index) => {
                  return (
                    <Col xs={24} sm={24} md={6} xxl={6} key={index}>
                      <CourseCard
                        dashboard
                        course={item}
                        callback={() =>
                          queryClient.invalidateQueries([`my-wishlist`])
                        }
                      />
                    </Col>
                  );
                })}
              </Row>
              <OwnPagination
                pagination={{
                  total: myWishList.meta?.total,
                  currentPage: myWishList.meta?.current_page,
                  perPage: myWishList.meta?.per_page,
                }}
                onChange={handleChange}
              />
              {/* {ceil(myWishList?.total / 10) > 1 && (
                <Pagination
                  className="custom-pagination"
                  count={ceil(myWishList?.total / 10)}
                  page={page}
                  onChange={handleChange}
                />
              )} */}
            </div>
          ) : (
            <div className="empty-list">
              <img
                src="/assets/images/Online-wishes-list-pana.png"
                alt="empty-background"
              />
              <p>Add courses to your wishlist</p>
              <Link to="/">Browse courses</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyWishlist;

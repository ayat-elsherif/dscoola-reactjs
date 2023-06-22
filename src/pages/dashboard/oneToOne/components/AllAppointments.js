import React from 'react';
import { ceil } from 'lodash';
import Utils from '../../../../utils';
import { useGetOneToOne } from '../hooks/useOneToOne';
import { Card, Col, Grid, Row, Skeleton } from 'antd';
import { useState } from 'react';
import AppointmentCard from './appointmentCard';
import EmptyCard from '../../../../helpers/emptyCard';
import OwnPagination from 'components/own/OwnPagination';
const { useBreakpoint } = Grid;

function AllAppointments({ search, status }) {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const [page, setPage] = useState(1);
  const { data: oneToOneList, isLoading } = useGetOneToOne(
    page,
    search,
    status,
  );
  const handleChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      {' '}
      {isLoading ? (
        <Row gutter={!isxxlap ? 25 : 55}>
          <Col xs={24} sm={24} md={12} xl={12}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} xl={12}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          {oneToOneList?.data?.length > 0 ? (
            <>
              <Row gutter={!isxxlap ? 25 : 55}>
                {oneToOneList?.data?.map((appointment) => {
                  return (
                    <Col xs={24} sm={24} md={24} xl={12}>
                      <AppointmentCard data={appointment} happening={false} />
                    </Col>
                  );
                })}
              </Row>{' '}
              <OwnPagination
                pagination={{
                  total: oneToOneList.meta?.total,
                  currentPage: oneToOneList.meta?.current_page,
                  perPage: oneToOneList.meta?.per_page,
                }}
                onChange={handleChange}
              />
              {/* {ceil(oneToOneList?.meta?.total / 10) > 1 && (
                <Pagination
                  className='custom-pagination'
                  count={ceil(oneToOneList?.meta?.total / 10)}
                  page={page}
                  onChange={handleChange}
                />
              )} */}
            </>
          ) : (
            <EmptyCard text="You don't make any appointment yet" />
          )}
        </>
      )}
    </div>
  );
}

export default AllAppointments;

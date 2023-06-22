import React from 'react';
import { ceil } from 'lodash';

import Utils from '../../../../utils';
import { useGetHappeningOneToOne } from '../hooks/useOneToOne';
import { Card, Col, Grid, Row, Skeleton } from 'antd';
import { useState } from 'react';
import AppointmentCard from './appointmentCard';
import EmptyCard from '../../../../helpers/emptyCard';
import OwnPagination from 'components/own/OwnPagination';
const { useBreakpoint } = Grid;

function HappeningAppointments({ search }) {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const [page, setPage] = useState(1);
  const { data: happeningList, isLoading } = useGetHappeningOneToOne(
    page,
    search,
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
          {happeningList?.data?.length > 0 ? (
            <>
              <Row gutter={!isxxlap ? 25 : 55}>
                {happeningList?.data?.map((appointment) => {
                  return (
                    <Col xs={24} sm={24} md={12} xl={12}>
                      <AppointmentCard data={appointment} happening={false} />
                    </Col>
                  );
                })}
              </Row>{' '}
              <OwnPagination
                pagination={{
                  total: happeningList.meta?.total,
                  currentPage: happeningList.meta?.current_page,
                  perPage: happeningList.meta?.per_page,
                }}
                onChange={handleChange}
              />
              {/* {ceil(happeningList?.meta?.total / 10) > 1 && (
                <Pagination
                  className='custom-pagination'
                  count={ceil(happeningList?.meta?.total / 10)}
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

export default HappeningAppointments;

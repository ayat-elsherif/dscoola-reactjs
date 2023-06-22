import React, { useEffect, useState } from 'react';
import { Col, Grid, Row, Card, Skeleton, Button } from 'antd';
import Utils from '../../../../utils';
import { useGetEnrolleYallaOnLine } from '../hooks/useMyYallaOnLine';
import { Link } from 'react-router-dom';
import YallaOnlineCard from 'helpers/cards/YallaOnlineCard/YallaOnlineCard';
import OwnPagination from 'components/own/OwnPagination';
const { useBreakpoint } = Grid;

function EnrolledGroups({ filters, setGroupLength }) {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const [page, setPage] = useState(1);
  const handleChange = (page) => {
    setPage(page);
  };
  const { data: enrolledGroups, isLoading } = useGetEnrolleYallaOnLine(
    page,
    filters['search'],
    filters['status'],
  );
  // console.log('EnrolledGroups  enrolledGroups:', enrolledGroups);

  useEffect(() => {
    if (enrolledGroups?.data) setGroupLength(enrolledGroups?.data?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrolledGroups]);

  return (
    <div className="enrolled-groups">
      {isLoading ? (
        <Row gutter={!isxxlap ? 25 : 28}>
          <Col xs={24} sm={24} md={8} xl={6} xxl={4}>
            <Card>
              <Skeleton avatar active />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} xl={6} xxl={4}>
            <Card>
              <Skeleton avatar active />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} xl={6} xxl={4}>
            <Card>
              <Skeleton avatar active />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} xl={6} xxl={4}>
            <Card>
              <Skeleton avatar active />
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          {enrolledGroups?.data?.length > 0 ? (
            <>
              <Row gutter={!isxxlap ? 25 : 28}>
                {enrolledGroups?.data?.map((group) => {
                  return (
                    <Col xs={24} sm={24} md={8} xl={6} xxl={4} key={group.id}>
                      <YallaOnlineCard item={group} />
                    </Col>
                  );
                })}
              </Row>
              <OwnPagination
                pagination={enrolledGroups.pagination}
                onChange={handleChange}
              />
              {/* {ceil(enrolledGroups?.total / 10) > 1 && (
                <Pagination
                  className="custom-pagination"
                  count={ceil(enrolledGroups?.total / 10)}
                  page={page}
                  onChange={handleChange}
                />
              )} */}
            </>
          ) : (
            <div className="empty-list">
              <img
                src="/assets/images/yallonline-back.png"
                alt="empty-background"
              />
              <p>You don't have any group yet</p>
              <Link to="/yallaonline">
                <Button type="primary">Let`s Start Now</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EnrolledGroups;

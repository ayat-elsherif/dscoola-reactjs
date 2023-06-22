import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row, Card, Skeleton, Button } from 'antd';
import Utils from '../../../../utils';
import { useGetMyGroupsYallaOnLine } from '../hooks/useMyYallaOnLine';
import YallaOnlineCard from 'helpers/cards/YallaOnlineCard/YallaOnlineCard';
import OwnPagination from 'components/own/OwnPagination';

const { useBreakpoint } = Grid;

function MyGroups({ filters, setGroupLength }) {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const [page, setPage] = useState(1);
  const handleChange = (page) => {
    setPage(page);
  };
  const { data: myGroups, isLoading } = useGetMyGroupsYallaOnLine(
    page,
    filters['search'],
    filters['status'],
  );

  useEffect(() => {
    if (myGroups?.data) setGroupLength(myGroups?.data?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGroups]);

  return (
    <div className="enrolled-groups">
      {isLoading ? (
        <Row gutter={!isxxlap ? 25 : 28}>
          <Col xs={24} sm={24} md={8} xl={6} xxl={4}>
            <Card>
              {' '}
              <Skeleton avatar active />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} xl={6} xxl={4}>
            <Card>
              {' '}
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
          {myGroups?.data?.length > 0 ? (
            <>
              <Row gutter={!isxxlap ? 25 : 28}>
                {myGroups?.data?.map((group) => {
                  return (
                    <Col xs={24} sm={24} md={8} xl={6} xxl={4} key={group.id}>
                      {/* <YallaOnlineCard data={group} /> */}
                      <YallaOnlineCard item={group} />
                    </Col>
                  );
                })}
              </Row>
              <OwnPagination
                pagination={myGroups?.pagination}
                onChange={handleChange}
              />
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

export default MyGroups;

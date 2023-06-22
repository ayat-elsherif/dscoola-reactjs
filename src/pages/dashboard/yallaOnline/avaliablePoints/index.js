import { Col, Grid, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Utils from '../../../../utils';
import PointEarnCard from './components/earnPoints';
import PointCard from './components/points';
import PointHistory from './components/pointsHistory';
import usePointsAvailable from 'api-hooks/points/usePointsBalance';
const { useBreakpoint } = Grid;
const AvaliablePoints = ({ setGroupLength }) => {
  const [current_page, setcurrent_page] = useState(1);
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const { data, isLoading } = usePointsAvailable({
    current_page,
    per_page: 10,
  });
  console.log(data, 'dataaa');
  useEffect(() => {
    setGroupLength(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="avaliable-points">
      <Row gutter={!isxxlap ? 24 : 42}>
        <Col xs={24} sm={24} md={6} xl={6}>
          <PointCard
            total_cash={data?.total_cash}
            total_points={data?.total_points}
          />
        </Col>
        <Col xs={24} sm={24} md={18} xl={18}>
          <PointEarnCard />
        </Col>
      </Row>
      <PointHistory
        data={data?.paginated_history}
        isLoading={isLoading}
        setcurrent_page={setcurrent_page}
      />
    </div>
  );
};

export default AvaliablePoints;

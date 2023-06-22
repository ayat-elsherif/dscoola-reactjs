import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import OwnPagination from 'components/own/OwnPagination';
import OwnResult from 'components/own/OwnResult';
import YallaOnlineCard from 'helpers/cards/YallaOnlineCard/YallaOnlineCard';
import { crtArray } from 'utils';

function YallaOnlineCards({ list, pagination, loading }) {
  const YallaOnlineCardsStyles = css`
    padding: 1rem 0;
  `;

  return (
    <div className={YallaOnlineCardsStyles}>
      <Row gutter={[15, 15]}>
        {loading ? (
          crtArray(4)?.map((_, i) => (
            <Col key={i} span={8}>
              <YallaOnlineCard loading />
            </Col>
          ))
        ) : !!list?.length ? (
          list?.map((el) => (
            <Col key={el?.id} span={8}>
              <YallaOnlineCard item={el} />
            </Col>
          ))
        ) : (
          <OwnResult
            title="No Groups found"
            extra="It is a long established fact that a reader will be distracted by the readable content lorem"
          />
        )}
      </Row>
      {!!list?.length && <OwnPagination pagination={pagination} />}
    </div>
  );
}

export default YallaOnlineCards;

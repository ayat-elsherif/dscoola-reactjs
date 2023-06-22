import { css } from '@emotion/css';
import { Col, Row, Typography } from 'antd';

const { Paragraph } = Typography;

function CellDescription({ code, minPurchase, max_discount, numOfUsed }) {
  const CellDescriptionStyles = css`
    .header {
      padding: 1.2rem 6.5rem;
      background: rgba(127, 89, 209, 0.1);
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 2.1rem;
      color: #2a2a2a;
      text-transform: capitalize;
    }
    .body {
      padding: 1.2rem 6.5rem;

      font-weight: 400;
      font-size: 1.2rem;
      line-height: 2rem;
      color: #6a6f73;
    }
  `;

  return (
    <div className={CellDescriptionStyles}>
      <Row gutter={[0, 0]}>
        <Col span={24}>
          <div className="header">
            <Row>
              <Col span={6}>Code</Col>
              <Col span={6}>Min Purchase</Col>
              <Col span={6}>Max Discount</Col>
              <Col span={6}>Num Of Used</Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <div className="body">
            <Row>
              <Col span={6}>
                <Paragraph copyable>{code}</Paragraph>
              </Col>
              <Col span={6}>{minPurchase}</Col>
              <Col span={6}>{max_discount}</Col>
              <Col span={6}>{numOfUsed}</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CellDescription;

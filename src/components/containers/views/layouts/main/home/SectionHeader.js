import { css } from '@emotion/css';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

function SectionHeader({ title, viewAllLink }) {
  const SectionHeaderStyles = css`
    margin-bottom: 1.5rem;

    .title {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.8rem;
      color: #2a2a2a;
      width: fit-content;
      display: inline-block;
    }
    button {
      background-color: #efeff6;
      span {
        font: normal normal normal 1.4rem/2.1rem Poppins;
        letter-spacing: 0px;
        color: #7e59d1;
      }
    }
  `;

  return (
    <div className={SectionHeaderStyles}>
      <Row gutter={[5, 20]} align="middle" justify="space-between">
        <Col>
          <div className="title">{title}</div>
        </Col>
        {!!viewAllLink && (
          <Col>
            <Link to={viewAllLink}>
              <Button type="text">view all</Button>
            </Link>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default SectionHeader;

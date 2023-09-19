import { css } from '@emotion/css';
import { Button, Col, Image, Row } from 'antd';
import { Link } from 'react-router-dom';

function BecomeAnInsturctor() {
  const BecomeAnInsturctorStyles = css`
    background: #efeff6;
    .inner {
      min-height: 26.9rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .image {
      width: 22.2rem;
      @media screen and (max-width: 545px) {
        width: 17.2rem !important;
      }
    }

    .first-img {
      @media screen and (max-width: 767px) {
        display: none !important;
      }
    }
    .text-wrapper {
      max-inline-size: 75ch;
      text-align: center;
      color: #2a2a2a;
      .title {
        font-weight: 500;
        font-size: 2.8rem;
        line-height: 2.7rem;

        @media screen and (max-width: 545px) {
          display: none;
        }
      }
      .desc {
        font-size: 1.6rem;
        line-height: 2.4rem;
        letter-spacing: 0px;
        margin-bottom: 2rem;
      }
      button {
        min-height: 4rem;

        span {
          font: normal normal medium 1.6rem/3.2rem Poppins;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
    .small-title {
      font-weight: 500;
      font-size: 2.8rem;
      line-height: 2.7rem;
      margin-bottom: 1.6rem;
      text-align: center;
      color: #2a2a2a;
      @media screen and (min-width: 546px) {
        display: none;
      }
    }
  `;

  return (
    <div className={BecomeAnInsturctorStyles}>
      <div className="container">
        <div className="inner">
          <div className="small-title">Become an instructor today</div>

          <Row
            style={{ height: '100%' }}
            gutter={30}
            align="middle"
            justify="space-between"
            wrap={false}
          >
            <Col className="first-img">
              <Image
                preview={false}
                src="/assets/images/instractor-left-image.png"
                className="image"
              />
            </Col>
            <Col>
              <div className="text-wrapper">
                <div className="title">Become an instructor today</div>
                <div className="desc">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page
                </div>
                <Link to="/become-instructor">
                  <Button type="primary">Become an instructor</Button>
                </Link>
              </div>
            </Col>
            <Col>
              <Image
                preview={false}
                src="/assets/images/instractor-home-right-image.png"
                className="image"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default BecomeAnInsturctor;

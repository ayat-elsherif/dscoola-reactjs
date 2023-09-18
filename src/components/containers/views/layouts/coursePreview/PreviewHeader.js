import { css } from '@emotion/css';
import { Link, useParams } from 'react-router-dom';
import logo from 'logo.svg';
import { Col, Row } from 'antd';

import UserMenu from 'components/layout/Header/UserMenu/UserMenu';
import BtnGiftSend from 'components/tiny/BtnGiftSend';
import BtnShareCourse from 'components/tiny/BtnShareCourse';

function PreviewHeader({ title }) {
  const params = useParams();

  const PreviewHeaderStyles = css`
    background-color: #fff;
    box-shadow: 0px 3px 6px #0000001a;

    .inner {
      height: 7.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    ul.nav-wrapper {
      display: flex;
      align-items: center;
      gap: 1.7rem;
      li {
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2rem;
        color: #2a2a2a;

        &.brand-wrapper {
          padding-right: 3rem;
          @media screen and (max-width: 575px) {
            padding-right: 0rem;
            img {
              width: 90px;
              display: none;
            }
          }
        }
      }
    }
  `;

  return (
    <div className={PreviewHeaderStyles}>
      <div className="container-fluid">
        <div className="inner">
          <Row align="middle" justify="space-between">
            <Col>
              <ul className="nav-wrapper">
                <li className="brand-wrapper">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </li>
                <li>
                  {' '}
                  {console.log(params, 'paramsparamsparams')}
                  <Link
                    to={`/course-view/${params?.course_slug?.replace(
                      /" "/g,
                      '-',
                    )}`}
                  >
                    {title}
                  </Link>{' '}
                </li>
              </ul>
            </Col>
            <Col>
              <ul className="nav-wrapper">
                <li>
                  <BtnGiftSend />
                </li>
                <li>
                  <BtnShareCourse />
                </li>
                <li>
                  <UserMenu />
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default PreviewHeader;

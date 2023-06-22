import { css } from '@emotion/css';
import { Affix, Col, Row, Space } from 'antd';
import OwnBreadcrumb from 'components/own/OwnBreadcrumb';
import {
  envelopeFill,
  facebookColofulIcon,
  linkedColorfulIcon,
  mapDropFill,
  phoneFill,
  twitterColorfulIcon,
  youtubeColorfulIcon,
} from 'SVGs';
import FormContactUs from './FormContactUs';
import birdImage from 'assets/images/freepik--Bird--inject-1.png';

function ContactUsPage() {
  const ContactUsPageStyles = css`
    .page-header-wrapper {
      height: 15.1rem;
      background-color: #efeff6;

      .title {
        padding-bottom: 2rem;
        font-weight: 500;
        font-size: 3rem;
        line-height: 2rem;
        color: #2a2a2a;
        text-transform: capitalize;
      }
    }

    .contact-info-wrapper {
      padding: 3.5rem 0;
      background-image: url(${birdImage});
      background-repeat: no-repeat;
      background-position: 80% 80%;

      .title {
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 2rem;
        color: #2a2a2a;
        margin-bottom: 2rem;
      }
      p,
      a {
        font-size: 1.8rem;
        line-height: 2.7rem;
        color: #2a2a2a;
      }
    }

    .head {
      margin-bottom: 3rem;
    }
    .contacts {
      svg {
        width: 2rem;
        margin-inline-end: 5px;
      }
    }
    .socail-links {
      margin-top: 6rem;
    }
  `;

  return (
    <div className={ContactUsPageStyles}>
      <div className="page-header-wrapper">
        <div className="container over-visible">
          <OwnBreadcrumb current="contact us" />
          <div className="title">Contact us</div>
        </div>
      </div>
      <div className="container over-visible">
        <div className="page-inner">
          <Row wrap={false} gutter={60}>
            <Col flex="auto">
              <div className="contact-info-wrapper">
                <div className="head">
                  <h3 className="title">Contact information</h3>
                  <p>
                    Fill up the form and our team will get back to you within 24
                    hours.
                    <br /> Or contact us via :
                  </p>
                </div>
                <Space direction="vertical" size={20} className="contacts">
                  <a href="tel:+201100001938">{phoneFill} (+20) 1100001938</a>
                  <a href="mailto:support@dscoola.com">
                    {envelopeFill} support@dscoola.com
                  </a>
                  <a href="https://goo.gl/maps/sMrLfkVPZSyhJKdJ9?coh=178572&entry=tt">
                    {mapDropFill} Nasr City, Cairo, Egypt
                  </a>
                </Space>
                <div className="socail-links">
                  <h3 className="title">Social Media</h3>
                  <Space size={19}>
                    <a href="">{facebookColofulIcon}</a>
                    <a href="">{twitterColorfulIcon}</a>
                    <a href="">{youtubeColorfulIcon}</a>
                    <a href="">{linkedColorfulIcon}</a>
                  </Space>
                </div>
              </div>
            </Col>
            <Col>
              <Affix
                offsetTop={10}
                style={{ marginTop: -100, marginBottom: 100 }}
              >
                <FormContactUs />
              </Affix>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;

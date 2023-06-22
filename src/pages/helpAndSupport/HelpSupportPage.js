import { css } from '@emotion/css';
import { Col, Input, Row, Space } from 'antd';
import { Searchcon } from 'assets/svg';
import OwnBreadcrumb from 'components/own/OwnBreadcrumb';
import useDebounce from 'Hooks/utils/useDebounce';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { useEffect, useState } from 'react';
import headImage from 'assets/images/help-and-support.png';
import CollapseWrapper from 'components/CollapseWrapper/CollapseWrapper';
import { Link } from 'react-router-dom';
import HelpTopics from './HelpTopics/HelpTopics';

function HelpSupportPage() {
  const HelpSupportPageStyles = css`
    .page-header-wrapper {
      height: 28.7rem;
      background-color: #efeff6;

      .title {
        padding-bottom: 2rem;
        font-weight: 500;
        font-size: 3rem;
        line-height: 2rem;
        color: #2a2a2a;
        text-transform: capitalize;
      }
      .sub-title {
        padding-bottom: 2rem;
        font-size: 1.7rem;
        line-height: 3rem;
        color: #2a2a2a;
      }

      .input {
        height: 4.5rem;
        background-color: #fff;
        width: 41.6rem;
        border-radius: 6px;
        &.search {
          svg {
            width: 2rem;
            margin-inline-end: 0.5rem;
          }
          input {
            /* background-color: #f3f3f4; */
            &::placeholder {
              font: normal normal normal 1.4rem/2rem Poppins;
              letter-spacing: 0px;
              color: #6a6f73;
            }
          }
        }
      }

      .image-wrapper {
        img {
          height: 28.7rem;
        }
      }
    }

    .page-inner {
      padding: 2rem 0;
      .faq-content-wrapper {
        .faq-link {
          font-weight: 400;
          font-size: 1.3rem;
          line-height: 1.9rem;
          color: #6c757d;
        }
      }
    }
  `;

  const { searchQueryObj, setSearchQuery } = useSearchQuery();

  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounce = useDebounce(searchValue, 500);

  useEffect(() => {
    const newQueryObj = {
      ...searchQueryObj,
      topic: searchValueDebounce,
    };

    setSearchQuery(newQueryObj);
  }, [searchValueDebounce]);

  return (
    <div className={HelpSupportPageStyles}>
      <div className="page-header-wrapper">
        <div className="container over-visible">
          <Row justify="space-between">
            <Col>
              <OwnBreadcrumb current="Help and suppoert" />
              <div className="title">How Can We Help?</div>
              <div className="sub-title">
                Get answers to frequently asked questions
              </div>
              <Input
                prefix={<Searchcon />}
                // defaultValue={searchQueryObj.topic}
                placeholder="Search For Solution"
                className="input search"
                onChange={({ target }) => setSearchValue(target.value)}
              />
            </Col>
            <Col>
              <div className="image-wrapper">
                <img src={headImage} alt="Help and suppoert" width={10} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container over-visible">
        <div className="page-inner">
          <CollapseWrapper
            cols={2}
            title="Frequently Asked Questions"
            items={[
              {
                title: 'Refund Status: Common Questions',
                children: (
                  <Space direction="vertical" className="faq-content-wrapper">
                    <Link to="/" className="faq-link">
                      Where can I see the status of my refund?
                    </Link>
                    <Link to="/" className="faq-link">
                      When will I receive my refund?
                    </Link>
                    <Link to="/" className="faq-link">
                      What is the difference between a refund and a purchase
                      reversal?
                    </Link>
                    <Link to="/" className="faq-link">
                      Why was my refund request denied?
                    </Link>
                    <Link to="/" className="faq-link">
                      What is a “credit refund”?
                    </Link>
                  </Space>
                ),
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
              {
                title: 'Refund Status: Common Questions',
              },
            ]}
          />
          <HelpTopics />
        </div>
      </div>
    </div>
  );
}

export default HelpSupportPage;

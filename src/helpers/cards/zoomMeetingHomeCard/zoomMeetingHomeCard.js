import { css } from '@emotion/css';
import { Button, Col, Image, Row } from 'antd';
import { HappeningNow } from 'assets/svg';
import { fallbackCourseImage } from 'data/fallback';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { durationIcon, hostedByIcon, startAtIcon } from '../SVGs';

function zoomMeetingHomeCard({ course }) {
  // console.log('zoomMeetingHomeCard  course', course);
  const zoomMeetingHomeCardStyles = css`
    box-shadow: 0px 0px 6px #00000029;
    border-radius: 2px;
    padding: 4rem;
    margin-right: 2rem;

    .cover-wrapper {
      position: relative;
      .img {
        width: 35.6rem;
        max-width: 100%;
        height: 23.3rem;
        border-radius: 0.2rem;
        object-fit: cover;
        /* border: 1px solid red; */
      }
      .float-box {
        position: absolute;
        top: 1.6rem;
        left: 1.6rem;

        display: flex;
        align-items: center;
        gap: 0.3rem;

        padding: 0.2rem 0.5rem;
        background-color: #cc1915;
        border-radius: 1.3rem;

        svg {
          width: 1.1rem;
        }

        font-weight: 500;
        font-size: 1.2rem;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      .title {
        font-weight: 500;
        font-size: 2rem;
        line-height: 1.9rem;
        letter-spacing: 0px;
        color: #2a2a2a;
        margin-bottom: 0.4rem;
      }
      .desc {
        font-size: 1.5rem;
        line-height: 2.5rem;
        letter-spacing: 0px;
        color: #2a2a2a;
      }
      .info-wrapper {
        .item {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          .item-icon {
            svg {
              width: 2.5rem;
            }
          }

          .item-body {
            font-size: 1.4rem;
            line-height: 2.2rem;
            letter-spacing: 0px;
            .item-sub-title {
              color: #6a6f73;
            }
            .item-title {
              font-weight: 500;
              color: #2a2a2a;
            }
          }
        }
      }

      .card-foot {
        margin: 0.5rem 0;
        .price-wrapper {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .price {
            font-weight: 500;
            font-size: 1.8rem;
            line-height: 2.7rem;
            letter-spacing: 0px;
            color: #2a2a2a;
          }
          .old-price {
            font-size: 1.4rem;
            line-height: 2.1rem;
            color: #6a6f73;
            text-decoration: line-through;
          }
        }

        .btn-meeting {
          min-width: 20.1rem;
          min-height: 4rem;
        }
      }
    }
  `;
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';

  const trimText = (text, txtNo) => {
    // let text = course?.objective;
    if (text?.length > txtNo) {
      return text?.slice(0, txtNo) + '...';
    } else {
      return text;
    }
  };

  return (
    <div className={zoomMeetingHomeCardStyles}>
      <Row gutter={[30, 30]} wrap={false}>
        <Col xs={24} lg={8} style={{ flexShrink: 0 }}>
          <div className="cover-wrapper">
            <Link to={`/webinars/${course?.slug}`}>
              <Image
                preview={false}
                src={`${imgBaseUrl}/${course?.image}`}
                fallback={fallbackCourseImage}
                className="img"
              />
            </Link>
            {true && (
              <div className="float-box">
                <HappeningNow /> <span>{course?.webinar_status}</span>
              </div>
            )}
          </div>
        </Col>
        <Col xs={24} lg={16}>
          <div className="content-wrapper">
            <div>
              <Link to={`/webinars/${course?.slug}`} className="title">
                {course?.title}
              </Link>
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: trimText(course?.short_description, 80),
                }}
              />
            </div>
            <div className="info-wrapper">
              <Row gutter={[60, 20]}>
                <Col span>
                  <div className="item">
                    <div className="item-icon">{hostedByIcon}</div>
                    <div className="item-body">
                      <div className="item-sub-title">Hosted By</div>
                      <div className="item-title">{course?.creator_name}</div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="item">
                    <div className="item-icon">{startAtIcon}</div>
                    <div className="item-body">
                      <div className="item-sub-title">Start</div>
                      <div className="item-title">
                        {dayjs(course?.start_date).format(
                          'MMM DD, YYYY hh:mm a',
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="item">
                    <div className="item-icon">{durationIcon}</div>
                    <div className="item-body">
                      <div className="item-sub-title">Duration</div>
                      <div className="item-title">
                        {dayjs('0007-06-04 ' + course?.duration).format('H')}{' '}
                        Hours{' '}
                        {dayjs('0007-06-04 ' + course?.duration).format('mm') >
                        0
                          ? dayjs('0007-06-04 ' + course?.duration).format(
                              'mm',
                            ) + ' Minutes'
                          : ''}
                        {/* hour 20 Mintues */}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="card-foot">
              <Row align="middle" justify="space-between">
                <Col>
                  <div className="price-wrapper">
                    {course?.price_plan === 'free' ? (
                      <span className="price">Free</span>
                    ) : course?.sale_price ? (
                      <>
                        <span className="price">{course?.sale_price}EGP</span>
                        <span className="old-price">{course?.price}EGP</span>
                      </>
                    ) : (
                      <span className="price">{course?.price}EGP</span>
                    )}
                  </div>
                </Col>
                <Col>
                  <Link to={'/webinars/' + course?.slug}>
                    <Button type="primary btn-meeting">Join Meeting</Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default zoomMeetingHomeCard;

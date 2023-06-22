import { Button, Col, Row } from 'antd';
import useCartAdd from 'api-hooks/cart/useCartAdd';
import useWebinarJoin from 'api-hooks/webinar/useWebinarJoin';
import { TimeIcon } from 'assets/svg';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Highlight } from 'react-instantsearch-dom';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { limitedText } from 'utils';
import CardHeader from './pices/CardHeader';
import { WebinarCardStyles } from './style';
import './style.scss';

function WebinarCard({ course, algolia }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state?.user);
  const { cartAdd, cartAddLod } = useCartAdd('webinar');
  const { webinarJoin, webinarJoinLod } = useWebinarJoin();
  const startTime = course?.zoom_meetings?.[0]?.start_time;
  const endTime = course?.zoom_meetings?.[0]?.end_time;
  const [dateStatus, setDateStatus] = useState('');

  useEffect(() => {
    if (!course?.zoom_meetings?.length) return;
    const now = dayjs();

    if (now.isBefore(dayjs(startTime))) {
      // console.log('Coming Soon ');
      setDateStatus('comingSoon');
    }
    if (now.isAfter(dayjs(endTime))) {
      // console.log('Completed');
      setDateStatus('completed');
    }
    if (now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime))) {
      // console.log('Happening Now');
      setDateStatus('happeningNow');
    }
  }, [course?.zoom_meetings, startTime, endTime]);

  const onJoin = () => {
    webinarJoin({
      webinarId: course?.id,
      onSuc: (res) => {
        const meetingLink = res?.data?.[0];
        // console.log('webinarJoin  meetingLink', meetingLink);
        window.open(meetingLink, '_blank');
      },
    });
  };
  const onCartAdd = () => {
    const reqData = {
      item_id: course?.id,
      item_type: 'webinar',
    };
    cartAdd({
      reqData,
      onSuc: (res) => {
        // console.log('cartAdd  res', res);
      },
    });
  };
  return (
    <div className={WebinarCardStyles}>
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <CardHeader isWebinar course={course} dateStatus={dateStatus} />
        </Col>
        <Col span={24}>
          <div className="card-body">
            <Row gutter={[0, 6]}>
              <Col span={24}>
                <Link to={`/webinars/${course?.slug}`} className="author-name">
                  {algolia ? (
                    <Highlight attribute="author_name" hit={course} />
                  ) : (
                    course?.author_name || 'Unknown'
                  )}
                </Link>
              </Col>
              <Col span={24}>
                <Link className="course-title" to={`/webinars/${course?.slug}`}>
                  {algolia ? (
                    <Highlight attribute="title" hit={course} />
                  ) : (
                    limitedText(course?.title, 40)
                  )}
                </Link>
              </Col>
              <Col span={24}>
                <div
                  className="course-desc"
                  style={{ height: '38px' }}
                  dangerouslySetInnerHTML={{
                    __html: limitedText(course?.objective, 55),
                  }}
                />
              </Col>
              <Col span={24}>
                <div className="course-duration-wrapper">
                  <TimeIcon width={12} />
                  {dayjs(course?.start_date)?.format('HH:mm a')}
                  {' - '}
                  {dayjs(course?.end_date).format('HH:mm a')}
                </div>
              </Col>
              <Col span={24}>
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

              <Col span={24}>
                {currentUser?.isVerified &&
                course?.webinar_status === 'upcomming' &&
                course?.price_plan === 'paid' &&
                !dayjs(course?.end_date).isBefore(dayjs(), 'day') ? (
                  <Button
                    type="primary"
                    block
                    className="btn-action"
                    onClick={onCartAdd}
                    loading={cartAddLod}
                  >
                    Add to cart
                  </Button>
                ) : currentUser?.isVerified &&
                  course?.webinar_status !== 'closed' &&
                  course?.price_plan === 'free' ? (
                  <Button
                    type="primary"
                    block
                    className="btn-action"
                    onClick={onJoin}
                    loading={webinarJoinLod}
                  >
                    Join meeting
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    block
                    className="btn-action"
                    onClick={() => navigate('/webinars/' + course?.slug)}
                  >
                    Learn More
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default WebinarCard;

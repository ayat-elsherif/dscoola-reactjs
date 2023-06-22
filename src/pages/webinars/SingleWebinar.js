import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import UserCard from '../../helpers/cards/userCard/UserCard';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';
import DetailsCard from '../../helpers/cards/detailsSideCard/DetailsSideCard';

import ReviewsSection from './Reviews/CommentSection';
import { Skeleton, Col, Row, Space, message } from 'antd';
import useApi from 'Hooks/network/useApi';
import { RatingFeedback } from 'helpers/RatingFeedback';
import Reviewings from 'pages/courses/courseView/Reviewings';
import Feedback from './Feedback';

const include_parmas = '?includes=zoomMeetings,creator,ratings';

export default function SingleWebinar() {
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';
  const [authorCourses, setAuthorCourses] = useState([]);

  const [webinar, setWebinar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryName, setCatogryName] = useState(null);

  const { slug } = useParams();
  const { get } = useApi();

  const buildURL = (endpoint, slug, additiona_params) => {
    const url = `${endpoint}/${slug}${additiona_params}`;
    return url;
  };

  const handleGetWebinar = () => {
    const url = buildURL('/webinar', slug, include_parmas);
    setIsLoading(true);
    setError(null);

    get(url)
      .then((data) => {
        setWebinar(data.data?.[0]);
        handleGetAuthorCourses(data.data?.[0]);

        get(`categories/parent`).then((res) => {
          const category = res?.data?.find(
            (i) => i.id === data.data?.[0]?.parent_category_id,
          );
          console.log({ category });
          setCatogryName(category);
        });
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleGetWebinar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webinar]);

  const handleGetAuthorCourses = (webinar) => {
    get(`courses/auth/filter?perpage=1000&instructor[]=${webinar?.creator?.id}`)
      .then((res) => {
        setAuthorCourses(res?.total);
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  };

  if (!webinar && error) return <h1>{JSON.stringify(error)}</h1>;

  const isWebinarDatePassed =
    Date.parse(new Date()) >
    Date.parse(dayjs(webinar?.zoom_meetings[0]?.end_time));

  const LoadingSkeleton = () => {
    return (
      <div style={{ padding: '5rem' }}>
        <Skeleton active /> <Skeleton active /> <Skeleton active />{' '}
        <Skeleton active />
      </div>
    );
  };

  if (isLoading || !webinar) return <LoadingSkeleton />;

  const handleFetchDuration = (duration) => {
    if (!duration) return `0h 0m `;

    const parts = duration?.split(':');
    const durationHours = isNaN(parts?.[0]) ? parts?.[0] : parseInt(parts?.[0]);
    const durationMins = isNaN(parts?.[1]) ? parts?.[1] : parseInt(parts?.[1]);

    return `${durationHours}h ${durationMins}m `;
  };

  const formatDetails = (webinar) => {
    if (!webinar) return;
    return {
      created_by: webinar?.creator?.name,
      start_time: webinar?.zoom_meetings[0]?.start_time,
      duration: handleFetchDuration(webinar?.duration),
      // category: webinar?.parent_category_slug?.replaceAll('-', ' '),
      time_zone: webinar?.time_zone,
      end_time: webinar?.end_date,
      price: webinar?.price_plan === 'paid' ? webinar?.price : '',
      salePrice: webinar?.price_plan === 'paid' ? webinar?.sale_price : '',
      pricePlan: webinar?.price_plan,
    };
  };

  // const handleGetTitle = (title) => {
  //   const doc = new DOMParser().parseFromString(title, 'text/xml');
  //   return doc.firstChild.innerHTML;
  // };

  return (
    <div className="singleWebinar">
      <BreadCrumbsMultiple
        params={[
          { label: 'Webinars and Scoola Talks', url: '/webinars' },
          { label: webinar?.title },
        ]}
        title={webinar?.title}
      />

      <div className="container">
        <Space direction="vertical" size={50}>
          <div className="heroImgWebinar">
            <img
              className="webinar-image"
              src={`${imgBaseUrl}/${webinar?.image}`}
              alt="webinar cover"
            />
          </div>

          <Row justify="space-between">
            <Col lg={{ span: 15, order: 1 }} xs={{ span: 24, order: 2 }}>
              <div className="webinarAbout">
                <h4>About This Webinar</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: webinar?.objective,
                  }}
                  a
                ></p>
              </div>
              <div className="hostedBy">
                <UserCard
                  authorCourses={authorCourses}
                  creatorInfo={webinar?.creator}
                  isLoading={false}
                  isWebinar={true}
                  instructor="Hosted By"
                />
              </div>
              {/* {isWebinarDatePassed && <ReviewsSection slug={slug} />} */}
              {!isWebinarDatePassed && (
                <Feedback webinar={webinar} refetch={handleGetWebinar} />
              )}
            </Col>
            <Col lg={{ span: 7, order: 2 }} xs={{ span: 24, order: 1 }}>
              <DetailsCard
                categoryName={categoryName}
                webinar={webinar}
                handleGetWebinar={handleGetWebinar}
                details={formatDetails(webinar, webinar?.sub_category_slug)}
              />
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
}

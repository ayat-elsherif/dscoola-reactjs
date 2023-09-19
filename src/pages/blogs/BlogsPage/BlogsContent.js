import React from 'react';
import { Row, Col } from 'antd';
import PopularCard from '../../../helpers/cards/blogCards/PopularCard';
import RecentCard from '../../../helpers/cards/blogCards/RecentCard';
function BlogsContent() {
  return (
    <>
      <div className="blogArticles">
        <div className="container">
          <h4>Popular Articles</h4>

          <Row gutter={26}>
            <Col md={12} xs={24} className="mb-xl-0 mb-5">
              <PopularCard img={'/assets/images/blogs/articles/article1.jpg'} />
            </Col>
            <Col md={12} xs={24}>
              {' '}
              <PopularCard img={'/assets/images/blogs/articles/article2.jpg'} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="blogArticles">
        <div className="container">
          {' '}
          <h4>Recent Articles</h4>
          <Row gutter={30}>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <RecentCard />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default BlogsContent;

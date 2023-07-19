import React from 'react';
import { css } from '@emotion/css';
import './categories.scss';
import { crtArray } from 'utils';

import CategoriesSlider from 'components/categoriesSlider/CategoriesSlider';
import { Col, Row, Skeleton } from 'antd';
import SectionHeader from 'components/containers/views/layouts/main/home/SectionHeader';
function Categories({ data, loading }) {
  const mobileCategoriesStyles = css`
    margin: 8rem 0;
    position: relative;
  `;

  return (
    <>
      <div className={`categories ${mobileCategoriesStyles}`}>
        <SectionHeader title="Top Categories" />
        {loading ? (
          <Row>
            {crtArray(6).map((_, i) => (
              <Col span={4} key={i}>
                <Skeleton.Avatar active className="list-item" />
              </Col>
            ))}
          </Row>
        ) : data?.length > 0 ? (
          <CategoriesSlider items={data} />
        ) : (
          <div className={'main-header'}>
            <small>no categories found</small>{' '}
          </div>
        )}
      </div>
    </>
  );
}

export default Categories;

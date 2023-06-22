import { css } from '@emotion/css';
import React, { useState } from 'react';
import { Col, Result, Row, Select } from 'antd';
import BreadCrumbs from '../../helpers/breadCrumbs/BreadCrumbs';
import CardSkeleton from '../../components/common/CardSkeleton/CardSkeleton';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  connectStateResults,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from 'react-instantsearch-dom';
import AlgoliaFilterSection from 'pages/searchResults/AlgoliaFilterList';
import { WebinarsHit } from './WebinarHits';
import { useQParam } from 'Hooks/useQParam';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

function WebinarsPage() {
  const WebinarsPageStyles = css`
    padding-bottom: 6rem;
    .result-count {
      font-weight: 500;
      font-size: 2.4rem;
      color: #2a2a2a;
    }
    .select-sort {
      display: flex;
      align-items: center;
      .ant-select-selector {
        height: 4rem;
        min-width: 12.3rem;
        background-color: #f3f3f4;
        .ant-select-selection-placeholder {
          display: flex;
          align-items: center;

          font: normal normal normal 1.6rem/2.5rem Poppins;
          letter-spacing: 0px;
          color: #6a6f73;
        }
        .ant-select-selection-item {
          display: flex;
          align-items: center;
        }
      }
      .ant-select-arrow {
        svg {
          width: 0.9rem;
        }
      }
    }
  `;
  // const { webinarInfo, webinarInfoLod } = useWebinarInfo();
  const [searchResult, setSearchResult] = useState();
  const searchBy = useQParam('webinar-title');
  const navigate = useNavigate();
  // const onSort = (sort) => {
  //   // console.log('onChange  sort', sort);
  //   const queryObj = { ...searchQueryObj };
  //   if (!sort) {
  //     delete queryObj.order_by;
  //   } else {
  //     queryObj.order_by = sort;
  //   }
  //   setSearchQuery(queryObj);
  //   return null;
  // };
  // const { webinarInfo, webinarInfoLod } = useWebinarInfo();
  // console.log('WebinarsPage  webinarInfo', webinarInfo);

  const searchClient = algoliasearch(
    'SDEBPBV2PY',
    'ecbabce3464dbcefab9fa1643208499c',
  );

  const SearchResults = connectStateResults(({ searchState, searchResults }) =>
    !searchResults ? (
      <div className="course-grid-wrapper">
        {[0, 1, 2, 3, 4, 5, 6]?.map((s) => (
          <CardSkeleton key={s} />
        ))}
      </div>
    ) : searchResults.nbHits !== 0 ? (
      (setSearchResult(searchResults.nbHits),
      (<Hits hitComponent={WebinarsHit} />))
    ) : (
      <Result
        status="404"
        title="No Results..."
        subTitle="Sorry, No webinar found."
        className="grid-full-width"
      />
    ),
  );

  const filterList = [
    { header: 'Instructor', attribute: 'author_name' },
    { header: 'Category', attribute: 'category_name' },
    { header: 'Sub Catogory', attribute: 'sub_category_name' },
    { header: 'Duration', attribute: 'duration' },
  ];

  return (
    <>
      <BreadCrumbs
        param="Webinars & Scoola Talks"
        title="Webinars & Scoola Talks"
        txt=""
      />
      <InstantSearch indexName="webinars" searchClient={searchClient}>
        <div className="container">
          <div
            className={`${WebinarsPageStyles} search-view webinar-search-view`}
          >
            <Row gutter={[0, 35]}>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <div className="result-count">
                      results Found ({searchResult})
                    </div>
                  </Col>
                  <Col>
                    {/* <SortBy
                    sortOptions={[
                      { value: 'relevance', label: 'Relevance' },
                      { value: 'newest', label: 'Newest' },
                    ]}
                    mainPath={`/webinars`}
                    filterBy={''}
                    dispatchedAction={showZoomMeetingPage}
                    fetchStart={fetchStart}
                    // courses={data?.[0]?.data}
                  /> */}
                    <SearchBox
                      onChange={(e) => {
                        navigate({
                          search: `webinar-title=${e.target.value}`,
                        });
                      }}
                      defaultRefinement={searchBy || ''}
                    />
                    {/* <Select
                      // value={sortBy}
                      onChange={onSort}
                      placeholder="Sort by"
                      suffixIcon={<ArrowDownIcon />}
                      allowClear
                      className="select-sort"
                      options={[
                        {
                          value: 'is_popular,desc',
                          label: 'Most Popular',
                        },
                        {
                          value: 'timesRated,desc',
                          label: 'High Rated',
                        },
                        {
                          value: 'id,desc',
                          label: 'New Added',
                        },
                        {
                          value: 'price,desc',
                          label: 'Price: high to low',
                        },
                        {
                          value: 'price,asc',
                          label: 'Price: Low to high',
                        },
                      ]}
                    /> */}
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row gutter={30} wrap={false}>
                  <Col flex="30rem">
                    <AlgoliaFilterSection filterList={filterList} />
                    {/* <SideFilter
                    mainPath={'/webinars'}
                    filterBy={''}
                    // courses={data?.[0]?.data}
                    dispatchedAction={showZoomMeetingPage}
                    fetchStart={fetchStart}
                    getTotalNum={getTotalNum}
                  /> */}
                  </Col>
                  <Col flex="auto">
                    <div className="couses-wrapper">
                      <Row gutter={[30, 30]}>
                        <Configure hitsPerPage={9} />
                        <SearchResults />
                      </Row>
                      <div className="pagination">
                        <Pagination />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </InstantSearch>
    </>
  );
}

export default WebinarsPage;

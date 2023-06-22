import { Col, Result, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import CardSkeleton from '../../components/common/CardSkeleton/CardSkeleton';
import AlgoliaFilterSection from './AlgoliaFilterList';
import queryString from 'query-string';
import './search.scss';
import {
  Configure,
  connectStateResults,
  Hits,
  Pagination,
  SearchBox,
} from 'react-instantsearch-dom';
import { Hit } from './AlgoliaCards';
import { useQParam } from 'Hooks/useQParam';

function MainSearchResults() {
  const searchBy = useQParam('search-by');
  const location = useLocation();
  queryString.parse(location.search);

  const SearchResults = connectStateResults(({ searchState, searchResults }) =>
    !searchResults ? (
      <div className="course-grid-wrapper">
        {[0, 1, 2, 3, 4, 5, 6]?.map((s) => (
          <CardSkeleton key={s} />
        ))}
      </div>
    ) : searchResults.nbHits !== 0 ? (
      <Hits hitComponent={Hit} />
    ) : (
      <Result
        status="404"
        title="No Results..."
        subTitle="Sorry, No courses found."
        className="grid-full-width"
      />
    ),
  );

  const filterList = [
    { header: 'Category', attribute: 'category_name' },
    { header: 'Sub-Category', attribute: 'sub_category_name' },
    { header: 'Topic', attribute: 'topic_name' },
    { header: 'Duration', attribute: 'total_duration' },
    { header: 'Levels', attribute: 'level_name' },
    { header: 'Type', attribute: 'type' },
  ];

  return (
    <div className="container">
      <div className="search-view">
        <SearchBox defaultRefinement={searchBy || ''} />

        <div className="filter-row-holder">
          <h4>Courses</h4>
        </div>
        <Row gutter={30}>
          <Col xs={24} lg={6}>
            <AlgoliaFilterSection filterList={filterList} />
          </Col>
          <Col xs={24} lg={18}>
            <section className="GetFreeCourses home-section">
              <div className=" ">
                <Configure
                  filters={
                    location?.pathname.includes('rythm')
                      ? `price_plan:free`
                      : undefined
                  }
                  hitsPerPage={9}
                />
                <SearchResults />
              </div>
              <div className="pagination">
                <Pagination />
              </div>
            </section>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainSearchResults;

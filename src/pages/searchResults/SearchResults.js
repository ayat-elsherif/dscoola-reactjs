import React from 'react';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';
import { fetchStart, getSearchResult } from '../../features/filter/searchSlice';
import MainSearchResults from './MainSearchResults';
import { useQParam } from 'Hooks/useQParam';

function SearchResult() {
  // this should be renamed to searchTerm or somthing similar

  const searchBy = useQParam('search-by');

  return (
    <>
      {
        <div className="innerPage">
          <BreadCrumbsMultiple
            params={[
              {
                label: `Search result ' ${searchBy} '`,
              },
            ]}
            title={`Search result ${searchBy}`}
          />

          <section className="retrieveCoursesPages">
            <MainSearchResults
              fetchStart={fetchStart}
              getSearchResult={getSearchResult}
            />
          </section>
        </div>
      }
    </>
  );
}

export default SearchResult;

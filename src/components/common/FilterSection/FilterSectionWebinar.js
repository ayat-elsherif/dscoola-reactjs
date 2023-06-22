import React, { useState } from 'react';
import './FilterSection.scss';
import Category from './Filters/Category';
import Duration from './Filters/Durations';
import Levels from './Filters/Levels';
import Types from './Filters/Types';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FilterSection({ courses_meta }) {
  const [filterQuery, setFilterQuery] = useState({});
  const navigate = useNavigate();
  const Location = useLocation();
  function onFilterOptionsChange(key, value) {
    setFilterQuery((filterQuery) => ({
      ...filterQuery,
      [key]: value,
    }));
  }
  useEffect(() => {
    let fullQueryString = '';
    for (const key in filterQuery) fullQueryString += filterQuery[key];
    console.log('fullquerystring --> ', fullQueryString);
    navigate({
      pathname: Location?.pathname,
      search: '?' + (fullQueryString || ''),
    });
  }, [filterQuery]);

  return (
    <aside className="side-wrapper">
      <div className="side-content">
        {courses_meta && (
          <>
            <Category
              header="Category"
              meta={courses_meta.root_categories}
              queryParam="category[]"
              onFilterOptionsChange={onFilterOptionsChange}
            />
            <Category
              header="Sub-Category"
              meta={courses_meta.parent_categories}
              queryParam="sub_category[]"
              onFilterOptionsChange={onFilterOptionsChange}
            />
            <Category
              header="Topic"
              meta={courses_meta.topic_categories}
              queryParam="topic[]"
              onFilterOptionsChange={onFilterOptionsChange}
            />
            <Duration
              header="Duration"
              meta={courses_meta.course_durations}
              queryParam="duration[]"
              onFilterOptionsChange={onFilterOptionsChange}
            />
            <Levels
              header="Levels"
              meta={courses_meta.course_levels}
              queryParam="level[]"
              onFilterOptionsChange={onFilterOptionsChange}
            />
            <Types
              header="Types"
              meta={courses_meta.course_types}
              queryParam="type[]"
              onFilterOptionsChange={onFilterOptionsChange}
            />
          </>
        )}
      </div>
    </aside>
  );
}

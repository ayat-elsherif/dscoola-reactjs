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
  console.log('courses_meta --> ', courses_meta);
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
            {courses_meta?.instructors && (
              <Category
                header="instructors"
                meta={courses_meta?.instructors}
                queryParam="author_id"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.root_categories && (
              <Category
                header="Category"
                meta={courses_meta?.root_categories}
                queryParam="parent_category_id"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.parent_categories && (
              <Category
                header="Sub-Category"
                meta={courses_meta?.parent_categories}
                queryParam="second_category_id"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.topic_categories && (
              <Category
                header="Topic"
                meta={courses_meta?.topic_categories}
                queryParam="category_id"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.webinar_durations && (
              <Duration
                header="Duration"
                meta={courses_meta?.webinar_durations}
                queryParam="duration"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.course_durations && (
              <Duration
                header="Duration"
                meta={courses_meta?.course_durations}
                queryParam="duration[]"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.course_levels && (
              <Levels
                header="Levels"
                meta={courses_meta?.course_levels}
                queryParam="level[]"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.webinar_levels && (
              <Levels
                header="Levels"
                meta={courses_meta?.webinar_levels}
                queryParam="level"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
            {courses_meta?.course_types && (
              <Types
                header="Types"
                meta={courses_meta?.course_types}
                queryParam="type[]"
                onFilterOptionsChange={onFilterOptionsChange}
              />
            )}
          </>
        )}
      </div>
    </aside>
  );
}

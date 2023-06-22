import React from 'react';
import Coursecontent from '../../../../../../../pages/courses/courseView/CourseContent';
import TitleWithButton from '../TitleWithButton';
function CourseContent() {
  return (
    <div>
      <TitleWithButton title="Course Content" isButton={false} />
      <Coursecontent />
    </div>
  );
}

export default CourseContent;

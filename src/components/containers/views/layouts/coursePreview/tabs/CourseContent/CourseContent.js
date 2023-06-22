import Coursecontent from 'pages/courses/courseView/CourseContent';

function CourseContent() {
  return (
    <div className="tab-wrapper">
      <h2 className="tab-content-title">Course Content</h2>
      <Coursecontent showProgress />
    </div>
  );
}

export default CourseContent;

import fetch from '../../auth/AuthInterceptor';
const InstructorCoursesServices = {};

InstructorCoursesServices.getCourses = function (pagination, search, filter) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`title=*${search}*`);
  filter > -1 && queryList.push(`course.status=${filter}`);
  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue,
        )
      : ``;
  return fetch({
    url: `api/lecture/courses?page_limit=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
InstructorCoursesServices.deleteCourse = function (id) {
  return fetch({
    url: `api/lecture/courses/${id}`,
    method: 'delete',
    headers: {
      'public-request': 'true',
    },
  });
};

export default InstructorCoursesServices;

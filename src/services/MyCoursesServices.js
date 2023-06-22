import fetch from '../auth/AuthInterceptor';
const MyCoursesServices = {};

MyCoursesServices.getAllCourses = function (pagination, search) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`q=${search}`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/my/courses/enrolled?count=4&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

MyCoursesServices.getInprojressCourses = function (pagination, search) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`q=${search}`);
  queryList.push(`is_progress=1`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/my/courses/enrolled?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
MyCoursesServices.getComplatedsCourses = function (pagination, search) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`q=${search}`);
  queryList.push(`is_progress=2`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/my/courses/enrolled?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
export default MyCoursesServices;

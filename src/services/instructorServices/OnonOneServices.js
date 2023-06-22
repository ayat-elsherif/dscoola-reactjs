import fetch from '../../auth/AuthInterceptor';
const OneOneOneServices = {};

OneOneOneServices.getOneOnOneList = function (pagination, filters) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  filters['search'] && queryList.push(`q=*${filters['search']}*`);
  filters['status'] && queryList.push(`status=${filters['status']}`);
  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/oneonone/instructor-booking?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
// OneOneOneServices.deleteCourse = function (id) {
//   return fetch({
//     url: `api/lecture/courses/${id}`,
//     method: 'delete',
//     headers: {
//       'public-request': 'true',
//     },
//   });
// };

export default OneOneOneServices;

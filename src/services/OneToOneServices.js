import fetch from '../auth/AuthInterceptor';
const OneToOneServices = {};

OneToOneServices.getList = function (pagination, search, filter) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`q=${search}`);
  filter && queryList.push(`status=${filter}`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/oneonone/booking?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
OneToOneServices.getHappeningList = function (pagination, search) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`q=${search}`);
  queryList.push(`status=4`);
  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + '&' + currentValue
        )
      : ``;
  return fetch({
    url: `api/oneonone/booking?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
OneToOneServices.deleteAppointment = function (id) {
  return fetch({
    url: `api/oneonone/booking/${id}`,
    method: 'delete',
    headers: {
      'public-request': 'true',
    },
  });
};
OneToOneServices.getAvailableDays = function (id) {
  return fetch({
    url: `api/oneonone/work-hour?course_id=${id}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
OneToOneServices.getAvailableDaysForInstractor = function (id) {
  return fetch({
    url: `api/oneonone/work-hour?instructor_id=${id}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
OneToOneServices.getAvailableSluts = function (data) {
  return fetch({
    url: `api/oneonone/work-hour?start_time=${data}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
OneToOneServices.buySlot = function (data) {
  return fetch({
    url: `api/oneonone/booking`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data:data,
  });
};

export default OneToOneServices;

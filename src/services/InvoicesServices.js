import fetch from '../auth/AuthInterceptor';
const InVoicesServices = {};

InVoicesServices.getList = function (pagination, search, filter) {
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
    url: `api/my/invoices-history?count=10&${query}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};
InVoicesServices.getDetails = function (id) {
  return fetch({
    url: `/api/my/invoice/${id}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

export default InVoicesServices;

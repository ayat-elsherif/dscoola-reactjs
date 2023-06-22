import fetch from "../auth/AuthInterceptor";
const YallaOnlineServices = {};

YallaOnlineServices.getList = function (url, pagination, search, filter) {
  let queryList = [];
  pagination && queryList.push(`page=${pagination}`);
  search && queryList.push(`topic=*${search}*`);
  filter && queryList.push(`status=${filter}`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + "&" + currentValue
        )
      : ``;
  return fetch({
    url: `api/yallaonline/${url}?count=10&${query}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};
YallaOnlineServices.rate = function (id, data) {
  return fetch({
    url: `api/yallaonline/rate/${id}`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data,
  });
};

export default YallaOnlineServices;

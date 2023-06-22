import fetch from "../auth/AuthInterceptor";

const MostViewedService = {};

MostViewedService.getMostViewedCourses = function () {
  return fetch({
    url: "api/courses?perpage=30",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

MostViewedService.getAuthMostViewedCourses = function () {
  return fetch({
    url: "api/courses/auth?perpage=30",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};
export default MostViewedService;

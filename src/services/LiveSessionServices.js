import fetch from "../auth/AuthInterceptor";

const LiveSessionServices = {};

LiveSessionServices.getLiveSessionCourses = function () {
  return fetch({
    url: "api/courses?type=liveClass",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

LiveSessionServices.getAuthLiveSessionCourses = function () {
  return fetch({
    url: "api/courses/auth?type=liveClass",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};
export default LiveSessionServices;

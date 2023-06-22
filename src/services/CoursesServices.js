import fetch from "../auth/AuthInterceptor";
import useApi from '../network/useApi';

const accesstoken = localStorage.getItem("access_token");

const CoursesService = {};

CoursesService.getTopCourses = function () {
  return fetch({
    url: "api/courses/filter?rating[]=4&perpage=30",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

CoursesService.getAuthTopCourses = function () {
  return fetch({
    url: "api/courses/auth/filter?rating[]=4&perpage=30",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

CoursesService.getAllTopCourses = function () {
  return fetch({
    url: "api/courses/auth/filter?rating[]=4",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

CoursesService.getCourses = function (params) {
  console.log(params, "wwwwww")
  return fetch({
    url: `/courses${params ? params : ""}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

CoursesService.addReview = function (slug, data) {
  return fetch({
    url: `api/my/courses/${slug}`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};
export default CoursesService;

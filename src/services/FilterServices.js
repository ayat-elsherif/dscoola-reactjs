import fetch from "../auth/AuthInterceptor";

const accesstoken = localStorage.getItem("access_token");

const CoursesService = {};

CoursesService.getFilterByTopRating = function () {
  // debugger;
  if (accesstoken) {
    return fetch({
      url: "api/courses/auth/filter?perpage=10000&rating[]=4",
      method: "get",
      headers: {
        "public-request": "true",
      },
    });
  } else {
    return fetch({
      url: "api/courses/filter?perpage=10000&rating[]=4",
      method: "get",
      headers: {
        "public-request": "true",
      },
    });
  }
};

CoursesService.getFilterBySearch = function (pPage, param) {
  if (accesstoken) {
    return fetch({
      url: `api/courses/auth/filter?perpage=${pPage}&q=${param}`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    });
  } else {
    return fetch({
      url: `api/courses/filter?perpage=${pPage}&q=${param}`,
      method: "get",
      headers: {
        "public-request": "true",
      },
    });
  }
};

// CoursesService.getAuthFilterBySearch = function (pPage, param) {
//   return fetch({
//     url: `api/courses/auth/filter?perpage=${pPage}&q=${param}`,
//     method: "get",
//     headers: {
//       "public-request": "true",
//     },
//   });
// };

export default CoursesService;

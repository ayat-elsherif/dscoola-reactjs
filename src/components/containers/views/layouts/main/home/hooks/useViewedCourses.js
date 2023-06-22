// import { useQuery } from "@tanstack/react-query";
// import MostViewedService from "../../../../../../../services/MostViewedServices";
// const accesstoken = localStorage.getItem("access_token");

// const getViewedCourses = () => {
//   return MostViewedService.getViewedCourses();
// };

// const getAuthViewedCourses = () => {
//   return MostViewedService.getAuthViewedCourses();
// };
// export const viewedCourses = (onSuccess = (res) => res) => {
//   return useQuery(["Viewed-Courses"], () => getViewedCourses(), {
//     onSuccess,
//     onError,
//     enabled: !!accesstoken,
//   });
// };

// export const authViewedCourses = (onSuccess, onError) => {
//   return useQuery(["auth-viewed-courses"], () => getAuthViewedCourses(), {
//     onSuccess,
//     onError,
//     enabled: !accesstoken,
//   });
// };

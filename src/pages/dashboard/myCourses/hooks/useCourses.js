import { useQuery } from '@tanstack/react-query';
import MyCoursesServices from '../../../../services/MyCoursesServices';

const fetchMyAllCourses = (pagination, search) => {
  return MyCoursesServices.getAllCourses(pagination, search);
};

const fetchMyInprojressCourses = (pagination, search) => {
  return MyCoursesServices.getInprojressCourses(pagination, search);
};
const fetchMyComplatedCourses = (pagination, search) => {
  return MyCoursesServices.getComplatedsCourses(pagination, search);
};

export const useGetMyAllCourses = (pagination, search) => {
  return useQuery(
    [`my-all-courses`, pagination, search],
    () => fetchMyAllCourses(pagination, search),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetMyInprojressCourses = (pagination, search) => {
  return useQuery(
    [`my-inprojress-courses`, pagination, search],
    () => fetchMyInprojressCourses(pagination, search),
    {
      keepPreviousData: true,
    }
  );
};
export const useGetMyComplatedCourses = (pagination, search) => {
  return useQuery(
    [`my-complated-courses`, pagination, search],
    () => fetchMyComplatedCourses(pagination, search),
    {
      keepPreviousData: true,
    }
  );
};

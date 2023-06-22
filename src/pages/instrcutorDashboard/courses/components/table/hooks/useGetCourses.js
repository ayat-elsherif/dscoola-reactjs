import { useQuery } from '@tanstack/react-query';
import InstructorCoursesServices from '../../../../../../services/instructorServices/CoursesServices';

const fetchCourses = (pagination, search, filter) => {
  return InstructorCoursesServices.getCourses(pagination, search, filter);
};

export const useGetCourses = (pagination, search, filter) => {
  return useQuery(
    [`insructor-courses`, pagination, search, filter],
    () => fetchCourses(pagination, search, filter),
    {
      keepPreviousData: true,
    }
  );
};

import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCourseList = () => {
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/lecture/courses?page_limit=100`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.courseList], http, {
    onSuccess: undefined,
  });

  const courseList = data?.data;
  // console.log('useCourseList  courseList:', courseList);

  return { courseList, courseListLod: isLoading };
};

export default useCourseList;

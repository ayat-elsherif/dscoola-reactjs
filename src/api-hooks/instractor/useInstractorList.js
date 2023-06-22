import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useInstractorList = (value) => {
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/users?email=*${value}*`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.instractorList, value],
    http,
    {
      onSuccess: undefined,
    },
  );

  const instractorList = data?.data;
  // console.log('useCourseList  courseList:', courseList);

  return { instractorList, instractorListLod: isLoading };
};

export default useInstractorList;

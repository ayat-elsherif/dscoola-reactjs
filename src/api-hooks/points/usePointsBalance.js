import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const usePointsBalance = () => {
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/my/points/balance`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.points.getBalance], http, {
    onSuccess: undefined,
  });
  console.log('useCoursesEnrolled  data:', data);

  // const coursesEnrolled = data?.data;
  // console.log('useCoursesEnrolled  coursesEnrolled:', coursesEnrolled);

  return { data: data?.data, isLoading };
};

const usePointsAvailable = (params) => {
  console.log(params, 'params');
  const api = useApi();
  const http = async () => {
    const res = await api.get(
      `/my/points/available?page=${params?.current_page}&perpage=${params?.per_page}`,
    );
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.points.getAvailable, params?.current_page],
    http,
    {
      onSuccess: undefined,
    },
  );

  // const coursesEnrolled = data?.data;
  // console.log('useCoursesEnrolled  coursesEnrolled:', coursesEnrolled);

  return { data: data?.data, isLoading };
};

export default usePointsAvailable;

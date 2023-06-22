import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useCoursesEnrolled = () => {
  const { currentUser } = useSelector((state) => state?.user);

  const api = useApi();
  const http = async () => {
    const res = await api.get(`/my/courses/enrolled?perPage=20`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.coursesEnrolled], http, {
    enabled: !!currentUser && currentUser.isVerified,
    onSuccess: undefined,
  });
  console.log('useCoursesEnrolled  data:', data);

  const coursesEnrolled = data?.data;
  // console.log('useCoursesEnrolled  coursesEnrolled:', coursesEnrolled);

  return { coursesEnrolled, coursesEnrolledLod: isLoading };
};

export default useCoursesEnrolled;

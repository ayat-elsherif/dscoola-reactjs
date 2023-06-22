import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useProfileStudent = (userId) => {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/my/student/profile?user_id=${userId}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.profileStudent, userId],
    http,
    {
      enabled: !!userId,
      onSuccess: undefined,
    },
  );

  const profileStudent = data?.data;

  return {
    profileStudent,
    profileStudentLod: isLoading,
  };
};

export default useProfileStudent;

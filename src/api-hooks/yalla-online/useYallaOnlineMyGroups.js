import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineMyGroups = (userId) => {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/yallaonline/my-groups?user_id=${userId}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.yallaOnlineMyGroups, userId],
    http,
    {
      enabled: !!userId,
      onSuccess: undefined,
    },
  );

  const yallaOnlineMyGroups = data?.data;
  const pagination = data?.pagination;

  return {
    yallaOnlineMyGroups,
    pagination,
    yallaOnlineMyGroupsLod: isLoading,
  };
};

export default useYallaOnlineMyGroups;

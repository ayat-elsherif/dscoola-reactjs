import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineList = () => {
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async () => {
    const res = await api.get(`/yallaonline?${searchQueryStr}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.yallaOnlineList, searchQueryStr],
    http,
    {
      onSuccess: undefined,
    },
  );

  const yallaOnlineList = data?.data;
  const yallaOnlinePagination = data?.pagination;

  return {
    yallaOnlineList,
    yallaOnlinePagination,
    yallaOnlineListLod: isLoading,
  };
};

export default useYallaOnlineList;

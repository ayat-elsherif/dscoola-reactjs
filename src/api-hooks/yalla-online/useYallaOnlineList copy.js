import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineList = (course_id) => {
  console.log('useYallaOnlineList  course_id', course_id);
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async () => {
    const res = await api.get(
      `/yallaonline?course_id=${course_id}&${searchQueryStr}`,
    );
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.yallaOnlineList, course_id, searchQueryStr],
    http,
    {
      enabled: !!course_id,
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

import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineReviewList = (meetingId) => {
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async () => {
    const res = await api.get(
      `/yallaonline/rate/${meetingId}?${searchQueryStr}`,
    );
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.yallaOnlineReviewList, meetingId, searchQueryStr],
    http,
    {
      enabled: !!meetingId,
      onSuccess: undefined,
    },
  );

  console.log('useYallaOnlineReviewList  data:', data);
  const yallaOnlineReviewList = data?.data;
  const yallaOnlinePagination = data?.pagination;

  return {
    yallaOnlineReviewList,
    yallaOnlinePagination,
    yallaOnlineReviewListLod: isLoading,
  };
};

export default useYallaOnlineReviewList;

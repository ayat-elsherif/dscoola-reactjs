import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineRate = ({ course_id, meet_id }) => {
  console.log('useYallaOnlineRate  meet_id:', meet_id);
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/yallaonline/rate/${meet_id}`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.yallaOnlineList, course_id + '']);
      client.invalidateQueries([queryKeys.yallaOnlineReviewList, meet_id]);
    },
  });

  return { yallaOnlineRate: mutate, yallaOnlineRateLod: isLoading };
};

export default useYallaOnlineRate;

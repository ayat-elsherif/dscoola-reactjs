import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineAdd = (course_id) => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/yallaonline/store`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.yallaOnlineList, course_id]);
    },
  });

  return { yallaOnlineAdd: mutate, yallaOnlineAddLod: isLoading };
};

export default useYallaOnlineAdd;

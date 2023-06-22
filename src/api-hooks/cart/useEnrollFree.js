import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useEnrollFree = () => {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/my/free-enrolled`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.homeData]);
    },
  });

  return { enrollFree: mutate, enrollFreeLod: isLoading };
};

export default useEnrollFree;

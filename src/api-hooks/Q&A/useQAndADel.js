import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useQAndADel = () => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ questionId, onSuc }) => {
    const res = await api.delete(`/my/thread/${questionId}`);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.QAndAList, searchQueryStr]);
    },
  });

  return { QAndADel: mutate, QAndADelLod: isLoading };
};

export default useQAndADel;

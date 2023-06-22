import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCrsCmtDel = () => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ commentId, onSuc }) => {
    const res = await api.delete(`/comment/${commentId}`);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.crsCmtList, searchQueryStr]);
    },
  });

  return { crsCmtDel: mutate, crsCmtDelLod: isLoading };
};

export default useCrsCmtDel;

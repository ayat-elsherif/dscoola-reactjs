import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCrsCmtUpd = () => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.put(`/comment/${reqData?.commentId}`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.crsCmtList, searchQueryStr]);
    },
  });

  return { crsCmtUpd: mutate, crsCmtUpdLod: isLoading };
};

export default useCrsCmtUpd;

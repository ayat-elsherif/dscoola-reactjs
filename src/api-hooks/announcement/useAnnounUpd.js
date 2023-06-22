import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useAnnounUpd = () => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.put(
      `/instructor/announcement/${reqData?.announId}`,
      reqData,
    );

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.announList, searchQueryStr]);
    },
  });

  return { announUpd: mutate, announUpdLod: isLoading };
};

export default useAnnounUpd;

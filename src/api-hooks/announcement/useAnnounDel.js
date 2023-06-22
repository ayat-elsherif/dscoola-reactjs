import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useAnnounDel = () => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ announId, onSuc }) => {
    const res = await api.delete(`/instructor/announcement/${announId}`);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.announList, searchQueryStr]);
    },
  });

  return { announDel: mutate, announDelLod: isLoading };
};

export default useAnnounDel;

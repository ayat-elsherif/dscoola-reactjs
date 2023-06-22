import { useMutation } from '@tanstack/react-query';
import useApi from 'network/useApi';
// import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineJoin = () => {
  // const client = useQueryClient();
  const api = useApi();

  const http = async ({ meet_id, onSuc }) => {
    const res = await api.post(`/yallaonline/join/${meet_id}`, {});

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    // onSettled: () => {
    //   client.invalidateQueries([queryKeys.yallaOnlineList, course_id + '']);
    // },
  });

  return { yallaOnlineJoin: mutate, yallaOnlineJoinLod: isLoading };
};

export default useYallaOnlineJoin;

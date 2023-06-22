import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useNotifList = () => {
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/my/notifications`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.notifList], http, {
    onSuccess: undefined,
  });

  const notifList = data?.data;

  return { notifList, notifListLod: isLoading };
};

export default useNotifList;

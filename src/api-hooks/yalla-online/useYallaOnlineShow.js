import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useYallaOnlineShow = (meet_id) => {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/yallaonline/${meet_id}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.yallaOnlineMeeting, meet_id],
    http,
    {
      enabled: !!meet_id,
      onSuccess: undefined,
    },
  );
  console.log('useYallaOnlineShow  data:', data);

  const yallaOnlineShow = data?.data;

  return {
    yallaOnlineShow,
    yallaOnlineShowLod: isLoading,
  };
};

export default useYallaOnlineShow;

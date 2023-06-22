import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useHomeData = () => {
  const api = useApi();
  const http = async () => {
    const fd = new FormData();
    const res = await api.post(`/home-page`, fd);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.homeData], http, {
    onSuccess: undefined,
    // staleTime: 1000 * 60 * 10,
    // cacheTime: 1000 * 60 * 15,
  });

  const homeData = data;

  return { homeData, homeDataLod: isLoading };
};

export default useHomeData;

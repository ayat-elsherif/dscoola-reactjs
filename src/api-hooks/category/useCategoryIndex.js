import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCategoryIndex = () => {
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/categories`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.categoryIndex], http, {
    onSuccess: undefined,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 15,
  });

  const categoryIndex = data?.data;

  return { categoryIndex, categoryIndexLod: isLoading };
};

export default useCategoryIndex;

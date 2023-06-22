import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useWishlist = (query) => {
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/my/courses/wishlist?count=10&${query}`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.wishlist], http, {
    onSuccess: undefined,
  });

  const wishlist = data?.data;

  return { wishlist, wishlistLod: isLoading };
};

export default useWishlist;

// pagination && queryList.push(`page=${pagination}`);
// search && queryList.push(`q=${search}`);

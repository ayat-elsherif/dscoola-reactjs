import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useCartInfo = () => {
  const { currentUser } = useSelector((state) => state?.user);

  const api = useApi();
  const http = async () => {
    const res = await api.get(`/cart`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.cartInfo], http, {
    enabled: !!currentUser,
    onSuccess: (res) => {
      console.log(res, 'resssssssssssss');
      if (!res?.data?.price_without_fees) {
        localStorage.removeItem('cartWithCoupon');
      }
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 15,
  });

  const cartInfo = data?.data;

  return { cartInfo, cartInfoLod: isLoading };
};

export default useCartInfo;

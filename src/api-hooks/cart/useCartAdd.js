import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCartAdd = (type) => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/cart`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      if (type === 'webinar') {
        client.invalidateQueries([queryKeys.webinarInfo]);
      } else {
        client.invalidateQueries([queryKeys.homeData]);
      }
      client.invalidateQueries([queryKeys.cartInfo]);
    },
  });

  return { cartAdd: mutate, cartAddLod: isLoading };
};

export default useCartAdd;

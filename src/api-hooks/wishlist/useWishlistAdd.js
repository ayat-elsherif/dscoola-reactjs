import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useWishlistAdd = () => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/my/courses/wishlist`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      // client.invalidateQueries([queryKeys.wishlist]);
      client.invalidateQueries([queryKeys.homeData]);
    },
  });

  return { wishlistAdd: mutate, wishlistAddLod: isLoading };
};

export default useWishlistAdd;

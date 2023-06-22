import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useWishlistRemove = () => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.delete(
      `/my/courses/wishlist/${reqData?.id}`,
      reqData,
    );

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.wishlist]);
      client.invalidateQueries([queryKeys.homeData]);
    },
  });

  return { wishlistRemove: mutate, wishlistRemoveLod: isLoading };
};

export default useWishlistRemove;

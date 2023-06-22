import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCartRemove = () => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.delete(
      `/cart/delete?item_id=${reqData?.id}&item_type=${reqData?.type}`,
      reqData,
    );

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.cartInfo]);
    },
  });

  return { cartRemove: mutate, cartRemoveLod: isLoading };
};

export default useCartRemove;

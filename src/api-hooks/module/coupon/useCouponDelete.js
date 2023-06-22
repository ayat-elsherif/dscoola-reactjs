import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCouponDelete = () => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ couponId, onSuc }) => {
    const fd = new FormData();
    fd.append('status', 1);

    const res = await api.post(`/coupons/delete/${couponId}`, fd);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.couponList]);
    },
  });

  return { couponDelete: mutate, couponDeleteLod: isLoading };
};

export default useCouponDelete;

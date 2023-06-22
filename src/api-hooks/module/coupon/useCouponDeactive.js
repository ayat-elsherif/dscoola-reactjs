import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCouponDeactive = () => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ couponId, status, onSuc }) => {
    const fd = new FormData();
    fd.append('status', status);
    const res = await api.post(`/coupons/deactive/${couponId}`, fd);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.couponList]);
    },
  });

  return { couponDeactive: mutate, couponDeactiveLod: isLoading };
};

export default useCouponDeactive;

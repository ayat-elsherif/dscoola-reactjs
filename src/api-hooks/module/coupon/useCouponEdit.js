import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCouponEdit = () => {
  const client = useQueryClient();
  const api = useApi();

  const http = async ({ couponId, reqData, onSuc }) => {
    const res = await api.post(`/coupons/update/${couponId}`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.couponList]);
    },
  });

  return { couponEdit: mutate, couponEditLod: isLoading };
};

export default useCouponEdit;

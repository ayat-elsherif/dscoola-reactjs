import { useMutation } from '@tanstack/react-query';
import useApi from 'network/useApi';
// import { queryKeys } from 'services/react-query/queryKeys';

const useCouponDiscount = () => {
  // const client = useQueryClient();
  const api = useApi();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/coupons/discount`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    // onSettled: () => {
    //   client.invalidateQueries([queryKeys.couponList]);
    // },
  });

  return { couponDiscount: mutate, couponDiscountLod: isLoading };
};

export default useCouponDiscount;

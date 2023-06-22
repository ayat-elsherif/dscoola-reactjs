import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useCouponList = () => {
  const { currentUser } = useSelector((state) => state?.user);
  const { searchQueryStr } = useSearchQuery();

  const api = useApi();
  const http = async () => {
    const res = await api.get(`/coupons/coupons?${searchQueryStr}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.couponList, searchQueryStr],
    http,
    {
      enabled: !!currentUser,
      onSuccess: undefined,
    },
  );

  const couponList = data?.data;
  const pagination = {
    total: data?.total,
    currentPage: data?.current_page,
    perPage: data?.per_page,
  };

  return { couponList, couponListLod: isLoading, pagination };
};

export default useCouponList;

import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../network/useApi';

export const useGetWalletInfo = () => {
  const api = useApi();
  return useQuery([`wallet-info`], () => api.get('instructor/wallet'), {
    keepPreviousData: true,
    onSuccess: (data) => {},
  });
};

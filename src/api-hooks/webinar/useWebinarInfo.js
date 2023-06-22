import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
// import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useWebinarInfo = () => {
  // const { currentUser } = useSelector((state) => state?.user);
  const { searchQueryStr } = useSearchQuery();
  console.log('useWebinarInfo  searchQueryStr', searchQueryStr);

  const api = useApi();
  const http = async () => {
    const res = await api.get(`/webinar?${searchQueryStr}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.webinarInfo, searchQueryStr],
    http,
    {
      // enabled: !!currentUser,
      onSuccess: undefined,
    },
  );

  const webinarInfo = data;

  return { webinarInfo, webinarInfoLod: isLoading };
};

export default useWebinarInfo;

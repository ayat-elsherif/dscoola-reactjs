import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
// import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useQAndAList = () => {
  //   const { currentUser } = useSelector((state) => state?.user);
  const { searchQueryStr } = useSearchQuery();
  // console.log('useWebinarInfo  searchQueryStr', searchQueryStr);
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/my/thread?${searchQueryStr}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.QAndAList, searchQueryStr],
    http,
    {
      // enabled: !!currentUser,
      onSuccess: undefined,
    },
  );

  const QAndAList = data?.data;
  const QAndAPagination = data?.pagination;

  return { QAndAList, QAndAPagination, QAndAListLod: isLoading };
};

export default useQAndAList;

// {{dscoolaLocal}}api/comment?commentable_encrypted_key=hibyecrypted&id=5&type=App\Course

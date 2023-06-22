import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
// import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useAnnounList = () => {
  //   const { currentUser } = useSelector((state) => state?.user);
  const { searchQueryStr } = useSearchQuery();
  // console.log('useWebinarInfo  searchQueryStr', searchQueryStr);
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/instructor/announcement?${searchQueryStr}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.announList, searchQueryStr],
    http,
    {
      // enabled: !!currentUser,
      onSuccess: undefined,
    },
  );

  const announList = data?.data;
  const announPagination = data?.pagination;

  return { announList, announPagination, announListLod: isLoading };
};

export default useAnnounList;

// {{dscoolaLocal}}api/comment?commentable_encrypted_key=hibyecrypted&id=5&type=App\Course

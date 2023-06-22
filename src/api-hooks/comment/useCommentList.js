import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { queryKeys } from 'services/react-query/queryKeys';

const useCommentList = (query) => {
  const { searchQueryStr } = useSearchQuery();

  const api = useApi();
  const http = async () => {
    if (query === null) return null;
    const res = await api.get(`/comment?${query ? query : searchQueryStr}`);
    return res;
  };

  const { data, isLoading, isFetching, refetch } = useQuery(
    [queryKeys.commentList, query ? query : searchQueryStr],
    http,
    {
      onSuccess: undefined,
    },
  );

  const commentList = data?.data;

  return {
    commentList,
    commentListLod: isLoading,
    commentListFetching: isFetching,
    commentListRefetch: refetch,
  };
};

export default useCommentList;

// {{dscoolaLocal}}api/comment?commentable_encrypted_key=hibyecrypted&id=5&type=App\Course

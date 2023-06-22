import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCommentAdd = (query) => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/comment`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([
        queryKeys.commentList,
        query ? query : searchQueryStr,
      ]);
    },
  });

  return { commentAdd: mutate, commentAddLod: isLoading };
};

export default useCommentAdd;

// {
//   "commentable_encrypted_key": "hibyecrypted",
//   "id": 5,
//   "type": "App\\Course",
//   "message": "Great course, and great instructor again",
//   "voice_url": "url_to_s3_voice_file.mp3"
// }

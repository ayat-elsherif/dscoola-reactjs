import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useCrsCmtReply = (id) => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ reqData, onSuc }) => {
    if (!id) return alert('add id to hook');
    const res = await api.post(`/comment/${id}`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      // client.invalidateQueries([queryKeys.crsCmtItem, id]);
      client.invalidateQueries([queryKeys.crsCmtList, searchQueryStr]);
    },
  });

  return { crsCmtReply: mutate, crsCmtReplyLod: isLoading };
};

export default useCrsCmtReply;

// {
//   "message": "Child reply to comment 7  instructor again",
//   "voice_url": "url_to_s3_voice_file.mp3"
// }

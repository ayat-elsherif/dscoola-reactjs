import { useMutation, useQueryClient } from '@tanstack/react-query';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import useApi from 'network/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

const useQAndAAdd = () => {
  const client = useQueryClient();
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async ({ reqData, onSuc }) => {
    const res = await api.post(`/my/thread`, reqData);

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.QAndAList, searchQueryStr]);
    },
  });

  return { QAndAAdd: mutate, QAndAAddLod: isLoading };
};

export default useQAndAAdd;

// {
//   "commentable_encrypted_key": "hibyecrypted",
//   "id": 5,
//   "type": "App\\Course",
//   "message": "Great course, and great instructor again",
//   "voice_url": "url_to_s3_voice_file.mp3"
// }

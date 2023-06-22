import { useMutation } from '@tanstack/react-query';
import useApi from 'network/useApi';

const useWebinarJoin = () => {
  const api = useApi();

  const http = async ({ webinarId, onSuc }) => {
    const res = await api.post(`/webinar/join/${webinarId}`, {});

    if (res.success && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http);

  return { webinarJoin: mutate, webinarJoinLod: isLoading };
};

export default useWebinarJoin;

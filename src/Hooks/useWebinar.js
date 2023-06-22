import { useQuery } from '@tanstack/react-query';
import useApi from '../network/useApi';

function useWebinars(key = "webinars", params) {
  const api = useApi();
  const http = async () => {
    // const res = await api.get(`/courses/filter?perpage=10000&rating[]=4`);
    const res = await api.get(`/webinar${params ? +"/filter?"+params : ""}`);
    // const res = await api.get(`/webinar${params ? `/filter?${params}` : ""}`);

    return res;
  };
  const { data, isFetching } = useQuery([key], http, {
    onSuccess: undefined,
  });
  return { data, isFetching };  
}

export default useWebinars;

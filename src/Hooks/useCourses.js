import { useQuery } from '@tanstack/react-query';
import useApi from '../network/useApi';

function useCourses(key = "courses", params) {
  const api = useApi();
  const http = async () => {
    console.log(params, "params")
    const res = await api.get(`/courses${params ? params : ""}`);
    return res;
  };
  const { data, isFetching } = useQuery([key], http, {
    onSuccess: undefined,
  });
  return { data, isFetching };  
}

export default useCourses;

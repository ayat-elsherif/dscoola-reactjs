import { useQuery } from '@tanstack/react-query';
import useApi from 'Hooks/network/useApi';
// import { useSelector } from 'react-redux';
import { queryKeys } from 'services/react-query/queryKeys';

const useCrsCmtItem = (id) => {
  //   const { currentUser } = useSelector((state) => state?.user);
  const api = useApi();
  const http = async () => {
    const res = await api.get(`/comment/${id}`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.crsCmtItem, id], http, {
    enabled: !!id,
    onSuccess: undefined,
  });
  console.log('useCrsCmtItem  data', data);

  const crsCmtItem = data?.data?.[0];

  return { crsCmtItem, crsCmtItemLod: isLoading };
};

export default useCrsCmtItem;

// {{dscoolaLocal}}api/comment?commentable_encrypted_key=hibyecrypted&id=5&type=App\Course

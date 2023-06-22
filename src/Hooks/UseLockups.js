import { useQuery } from '@tanstack/react-query';
import LockupsServices from '../services/LockupsServices';

const fetchLockupsLists = (url) => {
  return LockupsServices.getList(url);
};

export const useGetLockupsList = (key, url) => {
  return useQuery([`${key}`], () => fetchLockupsLists(url));
};

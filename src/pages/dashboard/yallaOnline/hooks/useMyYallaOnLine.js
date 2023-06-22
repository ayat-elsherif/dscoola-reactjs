import { useMutation, useQuery } from '@tanstack/react-query';
import YallaOnlineServices from '../../../../services/YallaOnlineServices';

const fetchEnrolleYallaOnLine = (pagination, search, filter) => {
  return YallaOnlineServices.getList('enrolled', pagination, search, filter);
};
const fetchMyGroupsYallaOnLine = (pagination, search, filter) => {
  return YallaOnlineServices.getList('my-groups', pagination, search, filter);
};
const addRate = (id, data) => {
  return YallaOnlineServices.rate(id, data);
};

export const useGetEnrolleYallaOnLine = (
  pagination,
  search,
  filter,
  onSuccess = (res) => res
) => {
  return useQuery(
    [`yallaonline/enrolled`, pagination, search, filter],
    () => fetchEnrolleYallaOnLine(pagination, search, filter),
    {
      keepPreviousData: true,
      onSuccess: onSuccess,
    }
  );
};

export const useGetMyGroupsYallaOnLine = (
  pagination,
  search,
  filter,
  onSuccess = (res) => res
) => {
  return useQuery(
    [`yallaonline/my-groups`, pagination, search, filter],
    () => fetchMyGroupsYallaOnLine(pagination, search, filter),
    {
      keepPreviousData: true,
      onSuccess: onSuccess,
    }
  );
};

export const useRate = (id, onSuccess, onError) => {
  return useMutation((data) => addRate(id, data), {
    onSuccess,
    onError,
  });
};

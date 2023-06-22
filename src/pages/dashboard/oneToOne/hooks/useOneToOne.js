import { useMutation, useQuery } from '@tanstack/react-query';
import OneToOneServices from '../../../../services/OneToOneServices';

const fetchOneToOne = (pagination, search, filter) => {
  return OneToOneServices.getList(pagination, search, filter);
};
const fetchHappeningOneToOne = (pagination, search, filter) => {
  return OneToOneServices.getHappeningList(pagination, search);
};
const deleteAppointment = (id) => {
  return OneToOneServices.deleteAppointment(id);
};

export const useGetOneToOne = (
  pagination,
  search,
  filter,
  onSuccess = (res) => res
) => {
  return useQuery(
    [`my-one-to-one`, pagination, search, filter],
    () => fetchOneToOne(pagination, search, filter),
    {
      keepPreviousData: true,
      onSuccess: onSuccess,
    }
  );
};

export const useGetHappeningOneToOne = (pagination, search) => {
  return useQuery(
    [`my-happening-one-to-one`, pagination, search],
    () => fetchHappeningOneToOne(pagination, search),
    {
      keepPreviousData: true,
    }
  );
};

export const useDeleteAppointment = (onSuccess, onError) => {
  return useMutation(deleteAppointment, {
    onSuccess,
    onError,
  });
};

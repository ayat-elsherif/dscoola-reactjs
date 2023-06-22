import { useQuery } from '@tanstack/react-query';
import OneOneOneServices from '../../../../../services/instructorServices/OnonOneServices';

const fetchOneOneOneList = (pagination, filters) => {
  return OneOneOneServices.getOneOnOneList(pagination, filters);
};

export const useGetOneOneOneList = (pagination, filters) => {
  return useQuery(
    [
      `insructor-one-on-one-list`,
      pagination,
      filters['search'],
      filters['status'],
    ],
    () => fetchOneOneOneList(pagination, filters),
    {
      keepPreviousData: true,
    }
  );
};

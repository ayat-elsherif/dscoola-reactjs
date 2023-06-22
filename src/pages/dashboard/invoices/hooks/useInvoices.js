import { useQuery } from '@tanstack/react-query';
import InVoicesServices from '../../../../services/InvoicesServices';

const fetchMyInvoices = (pagination, search, filter) => {
  return InVoicesServices.getList(pagination, search, filter);
};
const fetchDetails = (id) => {
  return InVoicesServices.getDetails(id);
};

export const useGetMyInvoices = (pagination, filters) => {
  return useQuery(
    [`my-invoices`, pagination, filters['search'], filters['status']],
    () => fetchMyInvoices(pagination, filters['search'], filters['status']),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetMyInvoiceDetails = (id) => {
  return useQuery([`Invoic-details`, id], () => fetchDetails(id), {
    enabled: !!id,
  });
};

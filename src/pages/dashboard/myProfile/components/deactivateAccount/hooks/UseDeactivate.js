import { useQuery, useMutation } from '@tanstack/react-query';
import DeactivateAcountServices from '../../../../../../services/profileSettings/DeactivateAcountServices';

const deactivate = (data) => {
  return DeactivateAcountServices.deactivate(data);
};

export const useDeactivateAccount = (onSuccess, onError) => {
  return useMutation(deactivate, {
    onSuccess,
    onError,
  });
};

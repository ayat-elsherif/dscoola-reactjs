import { useMutation } from '@tanstack/react-query';
import resetPasswordServices from '../../../../../../services/profileSettings/ResetPasswordServices';

const resetPassword = (data) => {
  return resetPasswordServices.resetPassowrd(data);
};

export const useResetPassword = (onSuccess, onError) => {
  return useMutation(resetPassword, {
    onSuccess,
    onError,
  });
};

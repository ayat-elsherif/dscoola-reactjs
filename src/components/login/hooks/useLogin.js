import {useMutation } from '@tanstack/react-query';
import AuthService from '../../../services/AuthServices';


 

const login = (data) => {
  return AuthService.login(data);
};
const verify = () => {
  return AuthService.verify();
};

 

export const useLogin = (onSuccess, onError) => {
  return useMutation(login, {
    onSuccess,
    onError,
  });
};

export const useVerify = (onSuccess, onError) => {
  return useMutation(verify, {
    onSuccess,
    onError,
  });
};
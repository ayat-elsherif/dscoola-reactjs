import {useMutation } from '@tanstack/react-query';
import OneToOneServices from '../../../../../../../../services/OneToOneServices';
  
const getAvailableSluts = (data) => {
  return OneToOneServices.getAvailableSluts(data);
};

const buySlot = (data) => {
  return OneToOneServices.buySlot(data);
};

export const useBuySlot = (onSuccess, onError) => {
  return useMutation(buySlot, {
    onSuccess,
    onError,
  });
};
 

 

 

 
import { useMutation } from '@tanstack/react-query';
import ChatServices from '../../../../../services/ChatServices';

const createRoom = (data) => {
  return ChatServices.createRoom(data);
};

export const useCreateRoom = (onSuccess, onError) => {
  return useMutation(createRoom, {
    onSuccess,
    onError,
  });
};

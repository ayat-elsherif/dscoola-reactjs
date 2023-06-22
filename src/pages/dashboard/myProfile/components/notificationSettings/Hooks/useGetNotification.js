import { useMutation, useQuery } from '@tanstack/react-query';
import fetch from '../../../../../../auth/AuthInterceptor';

const getProfileSettings = () => {
  return fetch({
    url: `api/my/dashboard/notifications/student-setting`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

export const useGetNotification = () => {
  return useQuery([`notifications-settings`], () => getProfileSettings(), {
    keepPreviousData: true,
    onSuccess: (data) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          user_id: data.data.id,
          user_name: data.data.name,
          user_img: data.data.photo_url,
          user_email: data.data.email,
        })
      );
    },
  });
};

const updateNotification =  (data) => {
  let newData = { ...data };
   
  return fetch({
    url: `api/my/dashboard/notifications/student-setting`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: newData,
  });
};

export const useUpdateNotification = (onSuccess, onError) => {
  return useMutation(updateNotification, {
    onSuccess,
    onError,
  });
};

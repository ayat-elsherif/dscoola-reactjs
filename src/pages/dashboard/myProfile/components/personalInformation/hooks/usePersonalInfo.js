import { useQuery, useMutation } from '@tanstack/react-query';
import PersonalInformationServices from '../../../../../../services/profileSettings/PersonalInformationServices';
import fetch from '../../../../../../auth/AuthInterceptor';

export const fetchProfiLeInfo = () => {
  return PersonalInformationServices.getProfileSettings();
};

const updateProfileInfo = (data) => {
  return PersonalInformationServices.updateMyProfile(data);
};

const getProfileimg = function () {
  return fetch({
    url: `my/settings/photo`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

export const useGetProfileInfo = () => {
  return useQuery([`profile-info`], () => fetchProfiLeInfo(), {
    keepPreviousData: true,
    onSuccess: (data) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          user_id: data.data.id,
          user_name: data.data.name,
          user_img: data.data.photo_url,
          user_email: data.data.email,
        }),
      );
    },
  });
};

export const useUpdateProfileInfo = (onSuccess, onError) => {
  return useMutation(updateProfileInfo, {
    onSuccess,
    onError,
  });
};

export const useGetProfileImg = () => {
  return useQuery([`profile-img`], () => getProfileimg(), {
    keepPreviousData: true,
    onSuccess: (data) => {},
  });
};

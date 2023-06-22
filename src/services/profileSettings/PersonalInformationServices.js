import fetch from '../../auth/AuthInterceptor';
const PersonalInformationServices = {};

PersonalInformationServices.getProfileSettings = function () {
  return fetch({
    url: `api/my/profile`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

PersonalInformationServices.updateMyProfile = function (data) {
  let newData = { ...data };
  newData.social_media_urls = {
    facebook: newData.facebook_check ? newData.facebook : '',
    twitter: newData.twitter_check ? newData.twitter : '',
    youtube: newData.youtube_check ? newData.youtube : '',
    linkedIn: newData.linkedIn_check ? newData.linkedIn : '',
  };
  delete newData.email;
  delete newData.facebook;
  delete newData.twitter;
  delete newData.youtube;
  delete newData.linkedIn;
  delete newData.facebook_check;
  delete newData.twitter_check;
  delete newData.youtube_check;
  delete newData.linkedIn_check;
  return fetch({
    url: `api/my/profile`,
    method: 'put',
    headers: {
      'public-request': 'true',
    },
    data: newData,
  });
};

// personalInformationServices.updateProfileSettings = function (data) {
//   const formData = new FormData();
//   formData.append('file', Blob, data.file);
//   return fetch({
//     url: `api/my/profile/photo`,
//     method: 'patch',
//     headers: {
//       'public-request': 'true',
//     },
//     data: formData,
//   });
// };

export default PersonalInformationServices;

import fetch from '../../auth/AuthInterceptor';
const DeactivateAcountServices = {};
DeactivateAcountServices.deactivate = function (data) {
  return fetch({
    url: `api/my/profile/deactivate`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data,
  });
};

export default DeactivateAcountServices;

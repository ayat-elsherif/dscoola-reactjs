import fetch from '../../auth/AuthInterceptor';
const resetPasswordServices = {};

resetPasswordServices.resetPassowrd = function (data) {
  return fetch({
    url: `api/my/settings/reset-password`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};
export default resetPasswordServices;

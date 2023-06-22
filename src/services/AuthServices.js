import fetch from '../auth/AuthInterceptor';

const AuthService = {};

AuthService.login = function (data) {
  return fetch({
    url: 'api/login',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};
AuthService.forgetPassword = function (data) {
  return fetch({
    url: 'api/forgot-password',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};
AuthService.resetPassword = function (token, data) {
  return fetch({
    url: `api/forgot-password/reset/${token}`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};
AuthService.verify = function () {
  return fetch({
    url: 'api/verification/email/verify/resend',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
  });
};

export default AuthService;

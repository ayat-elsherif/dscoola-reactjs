import fetch from '../auth/AuthInterceptor';
const LockupsServices = {};

LockupsServices.getList = function (url) {
  return fetch({
    url: `api/${url}`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

export default LockupsServices;

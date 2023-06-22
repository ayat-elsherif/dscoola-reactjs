import fetch from '../auth/AuthInterceptor';
const SertificatesServices = {};

 
SertificatesServices.getAllCerificates = function () {
  return fetch({
    url: `api/my/certificates`,
    method: 'get',
    headers: {
      'public-request': 'true',
    },
  });
};

SertificatesServices.getCerificatesDetailes = function (id) {
    return fetch({
      url: `api/my/certificate-details/${id}`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    });
  };

  SertificatesServices.downloadCerificate = function (id) {
    return fetch({
      url: `api/certificate/download/${id}`,
      method: 'post',
      headers: {
        'public-request': 'true',
      },
    });
  };


export default SertificatesServices;

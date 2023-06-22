import fetch from "../auth/AuthInterceptor";

const ZoomSettingsServices = {};

ZoomSettingsServices.setZoomSettings = function (data) {
  return fetch({
    url: "api/user/zoom-cred",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

export default ZoomSettingsServices;

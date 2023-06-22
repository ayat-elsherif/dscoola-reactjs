import fetch from "../auth/AuthInterceptor";

const MeetingService = {};

MeetingService.createMeeting = function (data) {
  return fetch({
    url: "api/yallaonline/store",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

MeetingService.rateMeeting = function (group_id, data) {
  return fetch({
    url: `api/yallaonline/rate/${group_id}`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

export default MeetingService;

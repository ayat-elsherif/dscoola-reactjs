import { useMutation } from "@tanstack/react-query";
import MeetingService from "../../../../../../../../services/MeetingServices";

const createMeeting = (data) => {
  return MeetingService.createMeeting(data);
};

const rateMeeting = (data, id) => {
  return MeetingService.rateMeeting(data, id);
};

export const useCreateMeeting = (onSuccess, onError) => {
  return useMutation(createMeeting, {
    onSuccess,
    onError,
  });
};

export const useRateMeeting = (id, onSuccess, onError) => {
  return useMutation((data) => rateMeeting(id, data), {
    onSuccess,
    onError,
  });
};

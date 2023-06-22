import { useQuery, useMutation } from "@tanstack/react-query";
import ZoomSettingsServices from "../../../../../services/ZoomSettingsServices";

const setZoomSettings = (data) => {
  return ZoomSettingsServices.setZoomSettings(data);
};

export const useZoomSettings = (onSuccess, onError) => {
  return useMutation(setZoomSettings, {
    onSuccess,
    onError,
  });
};

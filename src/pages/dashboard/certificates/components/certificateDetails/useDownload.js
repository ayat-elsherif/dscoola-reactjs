import {useMutation } from '@tanstack/react-query';
import SertificatesServices from '../../../../../services/Certificates';
 


 

const download = (id) => {
  return SertificatesServices.downloadCerificate(id);
};
 

 

export const useDownload = (onSuccess, onError) => {
  return useMutation(download, {
    onSuccess,
    onError,
  });
};

 
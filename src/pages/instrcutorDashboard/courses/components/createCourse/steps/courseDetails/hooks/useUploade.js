import AWS from 'aws-sdk';
import { message } from 'antd';
import { useState } from 'react';
window.Buffer = window.Buffer || require('buffer').Buffer;

export const useUpload = (onSuccess, onError) => {
  const [percentageValue, setPercentageValue] = useState(-1);
  const [fileData, setFileData] = useState();
  const [uploadKeyHook, setUploadKey] = useState();

  const uploadfile = (fileName, file, folderName) => {
    const bucketName = process.env.REACT_APP_BUCKET_NAME;
    const region = process.env.REACT_APP_REGION;
    const accessKeyId = process.env.REACT_APP_ACCESS;
    const secretAccessKey = process.env.REACT_APP_SECRET;
    var bucket = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      // sessionToken: "SESSION_TOKEN", // optional you can remove if you don't want pass
      region: region,
    });

    const params = {
      Bucket: bucketName,
      Key: folderName + fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    return bucket.upload(params, function (err, data) {
      console.log(data, 'sdcsdcspc');
      if (err) {
        message.error('There was an error uploading your file');
        return false;
      }
      setFileData(data);

      return true;
    });
  };

  const tuuid = (oldname) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const parts = oldname.replace(/[\s-]/g, '_').split('.');
    const extention = parts[parts.length - 1];
    parts.pop();
    return parts.join('-') + '_' + mm + '_' + dd + '_' + yyyy + '.' + extention;
  };

  const uploadSampleFile = (file) => {
    let folderName = file?.type?.includes('image')
      ? 'course.images/'
      : file?.type?.includes('pdf')
      ? 'course.lecture.resourse/'
      : 'course.video.preview/';
    let uniqueFileName = tuuid(file.name);

    let fileUpload = {
      id: '',
      name: file.name,
      nameUpload: uniqueFileName,
      size: file.size,
      type: '',
      timeReference: 'Unknown',
      progressStatus: 0,
      displayName: file.name,
      status: 'Uploading..',
    };

    uploadfile(uniqueFileName, file, folderName)
      .on('httpUploadProgress', function (progress) {
        let progressPercentage = Math.round(
          (progress.loaded / progress.total) * 100,
        );
        setPercentageValue(progressPercentage);
        if (progressPercentage < 100) {
          fileUpload.progressStatus = progressPercentage;
        } else if (progressPercentage === 100) {
          fileUpload.progressStatus = progressPercentage;
          fileUpload.status = 'Uploaded';
        }
      })
      .then((data) => {
        setUploadKey(data.key);
      })
      .catch((err) => {});
  };

  const upload = (file) => {
    return uploadSampleFile(file);
  };

  return {
    upload,
    fileData,
    uploadKeyHook,
    percentageValue,
  };
};

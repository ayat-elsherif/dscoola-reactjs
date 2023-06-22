import AWS from 'aws-sdk';
import { message } from 'antd';

const bucketName = process.env.REACT_APP_BUCKET_NAME;
const region = process.env.REACT_APP_REGION;
const accessKeyId = process.env.REACT_APP_ACCESS;
const secretAccessKey = process.env.REACT_APP_SECRET;
const bucket = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  // sessionToken: "SESSION_TOKEN", // optional you can remove if you don't want pass
  region: region,
});

function useS3Upload() {
  const s3Upload = async (file) => {
    // console.log('s3Upload  file', file);
    const params = {
      Bucket: bucketName,
      Key: file?.uid || new Date().toString(),
      Body: file,
      ACL: 'public-read',
      ContentType: file?.type,
    };

    const data = await bucket
      .upload(params, function (err, data) {
        if (err) {
          // console.log('err', err);
          message.error('There was an error uploading your file');
          return false;
        }

        // console.log('s3Upload data', data);
        return data;
      })
      .promise();

    // console.log('s3Upload data', data);
    return data.Location;
  };
  return { s3Upload };
}

export default useS3Upload;

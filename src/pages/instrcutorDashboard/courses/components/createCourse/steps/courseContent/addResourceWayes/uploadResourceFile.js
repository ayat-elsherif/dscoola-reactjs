import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, message, Progress, Row, Upload } from 'antd';
import useApi from 'network/useApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchaddDesc } from '../../../../../../../../features/courseContent/courseContentSlice';
import { useUpload } from '../../courseDetails/hooks/useUploade';

const UploadResourceFile = ({ lectuer }) => {
  const [fileType, setFileType] = useState();
  const [videoProgressPar, setVideoProgressPercentage] = useState(-1);
  const [videoId, setVideoId] = useState(null);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [uploadKey, setUploadKey] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const api = useApi();
  const [videoView, setVideoView] = useState(null);
  const onSuccess = () => {
    message.success('Video Uploaded Successfully');
  };
  const onError = (data) => {
    message.error('something went wrong!');
  };
  const { upload, percentageValue, fileData, uploadKeyHook } = useUpload(
    onSuccess,
    onError,
  );
  const uploadSampleFile = (file) => {
    setFileType(file.type);
    upload(file);
  };
  useEffect(() => {
    setVideoProgressPercentage(percentageValue);
    if (fileData) {
      setVideoId(fileData.Key);
      setVideoView(fileData.Key);
    }

    if (uploadKeyHook) setUploadKey(uploadKeyHook);
  }, [percentageValue, fileType, fileData, uploadKeyHook]);
  const handelFinish = () => {
    setLoading(true);
    const data = {
      file_url: videoId,
    };
    api
      .put(`lecture/${lectuer.id}/resource`, data)
      .then(() => {
        setLoading(false);
        message.success('add successfully!');
        queryClient.invalidateQueries([`get-course-content`]);
        dispatch(fetchaddDesc('close'));
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div className="add-file-container">
      <Row gutter={[8, 24]}>
        <Col span={24}>
          <Input.Group compact>
            <Input
              placeholder="No File selected"
              style={{
                width: 'calc(100% - 150px)',
                background: '#F9F9F9',
                border: '1px solid #DBDFEA',
                borderRadius: '4px',
                height: '45px',
              }}
              value={videoView}
            />
            {(videoProgressPar === 100 || videoProgressPar === -1) && (
              <Upload
                showUploadList={false}
                name="video"
                accept=".doc,.docx,application/pdf"
                customRequest={(file) => uploadSampleFile(file.file)}
              >
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #DBDFEA',
                    borderRadius: '0px 4px 4px 0px',
                    height: '45px',
                    width: '150px',
                    textAlign: 'center',
                    paddingTop: '11px',
                  }}
                >
                  Select File
                </div>
              </Upload>
            )}
          </Input.Group>
          {videoProgressPar >= 0 && (
            <Progress percent={videoProgressPar} size="small" />
          )}
        </Col>
        <Col span={24} justify="end">
          <Row justify="end">
            <Button onClick={() => dispatch(fetchaddDesc('close'))} type="link">
              Cancle
            </Button>
            <Button
              onClick={handelFinish}
              loading={loading}
              disabled={videoProgressPar !== 100 || videoProgressPar === -1}
              type="primary"
            >
              Save
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UploadResourceFile;

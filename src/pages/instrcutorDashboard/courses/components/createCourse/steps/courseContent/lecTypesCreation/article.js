import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Progress,
  Row,
  Skeleton,
  Upload,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchaddDesc,
  fetchopenAddLecTypesForm,
} from '../../../../../../../../features/courseContent/courseContentSlice';
import { useUpload } from '../../courseDetails/hooks/useUploade';
import useApi from '../../../../../../../../network/useApi';

export default function Article({ lectuer, sectionId, onEdit }) {
  const [fileType, setFileType] = useState();
  const [videoProgressPar, setVideoProgressPercentage] = useState(-1);
  const [videoId, setVideoId] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [uploadKey, setUploadKey] = useState('');
  const [duration, setDuration] = useState('');
  const [returnedVideo, setReturnedVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const api = useApi();
  const [videoView, setVideoView] = useState(null);
  const onSuccess = () => {
    message.success('Video Uploaded Successfully');
  };

  console.log(duration, 'df;kmb');

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
      setVideoId(fileData.key);
      setVideoView(fileData.Key);
    }

    if (uploadKeyHook) setUploadKey(uploadKeyHook);
  }, [percentageValue, fileType, fileData, uploadKeyHook]);
  const handelFinish = () => {
    setLoading(true);
    const data = {
      start_time: '11/29/2024 07:00:00',
      end_time: '12/26/2025 08:00:00',
      // "title": "video blueprinting part 2 for our course",
      type: 'artical',
      // "objective":"project blueprinting part 2",
      unlocked_date: '10/26/202',
      status: 1,
      duration: duration,
      file_url: videoId,
      // "attachment_url":"url-to-course-attachment-url.pdf",
      attachment_duration: '01:03',
      item_type: 'lecture',
      unlock_days: 3,
    };
    api
      .put(`lecture/section/${sectionId}/lecture/${lectuer.id}`, data)
      .then(() => {
        setLoading(false);
        message.success('add successfully!');
        queryClient.invalidateQueries([`get-course-content`]);
        dispatch(fetchaddDesc('close'));
        dispatch(fetchopenAddLecTypesForm('close'));
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const onGetarticleSuccess = (data) => {
    setReturnedVideo(data.data[0].items.artical);
    form.setFieldsValue({
      duration: data.data[0].items.artical.duration.slice(0, -3),
    });
    setDuration(data.data[0].items.artical.duration.slice(0, -3));
    setVideoId(data.data[0].items.artical.file_url);
    setVideoView(data.data[0].items.artical.file_url);
  };
  const { isLoading } = useQuery(
    [`get-lec-content-article`, lectuer?.id],
    () => {
      return api.get(`lecture/section/${sectionId}/lecture/${lectuer.id}`);
    },
    {
      onSuccess: onGetarticleSuccess,
      onError: onError,
      enabled: !!onEdit,
    },
  );
  //workarownd to fix reactQ bug
  const editLoading = !!onEdit && isLoading;
  return (
    <>
      {editLoading ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Skeleton active />
          </Col>
          <Col span={24}>
            <Skeleton active />
          </Col>
        </Row>
      ) : (
        <div className="add-file-container">
          <Form form={form} onFinish={handelFinish} layout="vertical">
            <Input.Group compact>
              <Input
                placeholder="No File selected"
                style={{
                  width: 'calc(100% - 160px)',
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
                      width: '135px',
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
            <Form.Item
              label="Article Time (ex. HH:MM) :"
              name="duration"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Lectuer Duration!',
                },
                {
                  type: 'string',
                  // pattern: /^(2[0-9]?[0-9]|2[0-9]):[0-5][0-9]$/,
                  pattern: /^([0-1][0-9]|2[0-9]):[0-5][0-9]$/,

                  message: 'Must match the format HH:MM',
                },
              ]}
            >
              <Input
                style={{ height: '45px' }}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Item>
            <Row justify="end" className="pt-5">
              <Button
                htmlType="submit"
                loading={loading}
                type="primary"
                disabled={
                  (videoProgressPar !== 100 || videoProgressPar === -1) &&
                  !returnedVideo
                }
              >
                Save
              </Button>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
}

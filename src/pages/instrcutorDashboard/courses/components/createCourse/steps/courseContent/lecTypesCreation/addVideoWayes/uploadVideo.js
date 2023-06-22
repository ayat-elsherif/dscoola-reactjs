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
  TimePicker,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchaddDesc,
  fetchopenAddLecTypesForm,
} from '../../../../../../../../../features/courseContent/courseContentSlice';
import useApi from '../../../../../../../../../network/useApi';
import { useUpload } from '../../../courseDetails/hooks/useUploade';

const UploadVideo = ({ lectuer, sectionId, onEdit }) => {
  const [fileType, setFileType] = useState();
  const [videoProgressPar, setVideoProgressPercentage] = useState(-1);
  const [videoId, setVideoId] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [returnedVideo, setReturnedVideo] = useState(null);
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
    if (fileType?.includes('video')) {
      setVideoProgressPercentage(percentageValue);
      if (fileData) {
        setVideoView(fileData.Key);
        setVideoId(fileData.Key);
      }
    }
  }, [percentageValue, fileType, fileData, uploadKeyHook]);
  const onFinish = (values) => {
    setLoading(true);
    const data = {
      start_time: '11/29/2024 07:00:00',
      end_time: '12/26/2025 08:00:00',
      type: 'video',

      unlocked_date: '10/26/2025',
      status: 1,
      duration: values.duration,
      file_url: {
        video_src: videoId,
        video_type: 'video/mp4',
        video_upload_type: 'uploaded',
      },
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
  const onGetSubCatSuccess = (data) => {
    if (data.data[0].items.video.video_src.video_upload_type === 'uploaded') {
      setReturnedVideo(data.data[0].items.video);
      form.setFieldsValue({
        duration: data.data[0].items.video.duration.slice(0, -3),
      });
      setVideoId(data.data[0].items.video.video_src.video_src);
      setVideoView(data.data[0].items.video.video_src.video_src);
    }
  };
  const { isLoading } = useQuery(
    [`get-lec-content-video`, lectuer?.id],
    () => {
      return api.get(`lecture/section/${sectionId}/lecture/${lectuer.id}`);
    },
    {
      onSuccess: onGetSubCatSuccess,
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
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Upload : ">
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
                      accept="video/mp4,video/x-m4v,video/*"
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
                        Select Video
                      </div>
                    </Upload>
                  )}
                </Input.Group>
              </Form.Item>
            </Col>
            {videoProgressPar >= 0 && (
              <Progress percent={videoProgressPar} size="small" />
            )}
            <Col span={24}>
              <Form.Item
                label="Video Time (ex. HH:MM) :"
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
                <Input style={{ height: '45px' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button
              style={{
                marginTop: '30px',
              }}
              // onClick={onFinish}
              loading={loading}
              htmlType="submit"
              disabled={
                (videoProgressPar !== 100 || videoProgressPar === -1) &&
                !returnedVideo
              }
              type="primary"
            >
              Save{' '}
            </Button>
          </Row>
        </Form>
      )}
    </>
  );
};

export default UploadVideo;

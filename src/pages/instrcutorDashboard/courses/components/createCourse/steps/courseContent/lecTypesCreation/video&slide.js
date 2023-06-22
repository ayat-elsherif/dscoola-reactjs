import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Col,
  Divider,
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
import { StepOneIcon, StepTwoIcon } from '../../../../../../../../assets/svg';
import {
  fetchaddDesc,
  fetchopenAddLecTypesForm,
} from '../../../../../../../../features/courseContent/courseContentSlice';
import { useUpload } from '../../courseDetails/hooks/useUploade';
import useApi from '../../../../../../../../network/useApi';

export default function VideoSlide({ lectuer, sectionId, onEdit }) {
  const [fileType, setFileType] = useState();
  const [ProgressPar, setProgressPercentage] = useState(-1);
  const [videoProgressPar, setVideoProgressPercentage] = useState(-1);
  const [videoId, setVideoId] = useState(null);
  const dispatch = useDispatch();
  const [imageId, setImageId] = useState(null);
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [returnedVideo, setReturnedVideo] = useState(null);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const api = useApi();
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
    if (fileType?.includes('application')) {
      setProgressPercentage(percentageValue);
      if (fileData) {
        setImageId(fileData.key);
      }
    } else if (fileType?.includes('video')) {
      setVideoProgressPercentage(percentageValue);
      if (fileData) {
        setVideoId(fileData.Key);
      }
    }
  }, [percentageValue, fileType, fileData, uploadKeyHook]);
  const handelFinish = () => {
    setLoading(true);
    const data = {
      start_time: '11/29/2024 07:00:00',
      end_time: '12/26/2025 08:00:00',
      // "title": "video blueprinting part 2 for our course",
      type: 'videoslide',
      // "objective":"project blueprinting part 2",
      unlocked_date: '10/26/202',
      status: 1,
      duration: duration,
      file_url: {
        video_src: videoId,
        video_type: 'video/mp4',
      },
      attachment_url: imageId,
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
  const onGetslideSuccess = (data) => {
    setReturnedVideo(data.data[0].items.video);
    form.setFieldsValue({
      duration: data.data[0].items.slide.duration.slice(0, -3),
    });
    setVideoId(data.data[0].items.video.video_src.video_src);
    setImageId(data.data[0].items.slide.file_url);
    setVideoName(data.data[0].items.video.video_src.video_src);
    setPdfName(data.data[0].items.slide.file_url);
    setDuration(data.data[0].items.slide.duration.slice(0, -3));
  };
  const { isLoading } = useQuery(
    [`get-lec-content-slide`, lectuer?.id],
    () => {
      return api.get(`lecture/section/${sectionId}/lecture/${lectuer.id}`);
    },
    {
      onSuccess: onGetslideSuccess,
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
          <Col span={24}>
            <Skeleton active />
          </Col>
        </Row>
      ) : (
        <div className="add-file-container">
          <Form layout="vertical" form={form}>
            <Row>
              <Col span={1}>
                <StepOneIcon />
              </Col>
              <Col className="pick-title">Pick a Video</Col>
              <Divider className="pick-divider" />
            </Row>
            <Input.Group compact>
              <Input
                placeholder="No File selected"
                style={{
                  width: 'calc(100% - 160px)',
                  background: '#F9F9F9',
                  border: '1px solid #DBDFEA',
                  borderRadius: '4px',
                  height: '45px',
                  // marginBottom: "50px",
                }}
                value={videoName}
              />
              {(videoProgressPar === 100 || videoProgressPar === -1) && (
                <Upload
                  showUploadList={false}
                  name="video"
                  accept="video/mp4,video/x-m4v,video/*"
                  customRequest={(file) => {
                    setVideoName(file.file.name);
                    uploadSampleFile(file?.file);
                  }}
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
                      marginBottom: '25px',
                    }}
                  >
                    Select Video
                  </div>
                </Upload>
              )}
              {videoProgressPar >= 0 && (
                <Progress
                  style={{
                    paddingBottom: '30px',
                  }}
                  percent={videoProgressPar}
                  size="small"
                />
              )}
            </Input.Group>
            <Row>
              <Col span={1}>
                <StepTwoIcon />
              </Col>
              <Col className="pick-title pl-4">Pick a Presentation</Col>
            </Row>
            <Divider className="pick-divider" />
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
                value={pdfName}
              />
              {(ProgressPar === 100 || ProgressPar === -1) && (
                <Upload
                  showUploadList={false}
                  name="video"
                  accept=".doc,.docx,application/pdf"
                  customRequest={(file) => {
                    setPdfName(file?.file.name);
                    uploadSampleFile(file?.file);
                  }}
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
                      marginBottom: '25px',
                    }}
                  >
                    Select Pdf
                  </div>
                </Upload>
              )}
            </Input.Group>
            {ProgressPar >= 0 && (
              <Progress
                style={{
                  paddingBottom: '10px',
                }}
                percent={ProgressPar}
                size="small"
              />
            )}
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
              <Input
                style={{ height: '45px' }}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Item>
            <Row justify="end" className="pt-5">
              <Button
                onClick={handelFinish}
                loading={loading}
                disabled={
                  (videoProgressPar !== 100 || videoProgressPar === -1) &&
                  !returnedVideo
                }
                type="primary"
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

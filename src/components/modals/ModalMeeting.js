import { css } from '@emotion/css';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Progress,
  Radio,
  Row,
  Select,
  TimePicker,
  Upload,
} from 'antd';
import useYallaOnlineAdd from 'api-hooks/yalla-online/useYallaOnlineAdd';
import { DownArrowIcon } from 'assets/svg';
import OwnModal from 'components/own/OwnModal';
import dayjs from 'dayjs';
import { useUpload } from 'pages/instrcutorDashboard/courses/components/createCourse/steps/courseDetails/hooks/useUploade';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalConfirm from './ModalConfirm';
import useApi from 'network/useApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function ModalMeeting({ open, setOpen, editMeeting }) {
  console.log('ModalMeeting  editMeeting', editMeeting);
  const ModalMeetingStyles = css`
    .form {
      margin: 0;
      label {
        font-weight: 400;
        font-size: 1.5rem;
      }

      /* .ant-upload-select {
        width: 100%;
      } */
      .upload_image_row {
        margin: 0;
        input {
          border-radius: 5px 0 0 5px;
        }
        button {
          border-radius: 0 5px 5px 0;
        }

        .ant-upload-list-item {
          display: block;
          width: fit-content;
          margin: auto;
          margin-top: 5px;

          .ant-upload-list-item-thumbnail {
            display: block;
            width: fit-content;
            margin: auto;
            img {
              object-fit: contain;
            }
          }
          span {
            display: none;
          }
        }
      }

      .btn-publish {
        margin-left: auto;
      }
    }
  `;

  const params = useParams();
  const [form] = Form.useForm();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [meetingHost, setMeetingHost] = useState('Zoom');

  const { yallaOnlineAdd, yallaOnlineAddLod } = useYallaOnlineAdd(
    params?.course_id,
  );

  const onChangeMeetingHost = ({ target }) => {
    console.log('onChangeMeetingHost  value', target.value);
    setMeetingHost(target.value);
  };

  const [SearchWord, setSearchWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  var timeZoneArr = [];

  const { data: timeZones, isLoading: timeZoneLoading } = useQuery(
    [`get-time-zones`, SearchWord],
    () => {
      return api.get(`timezones${SearchWord ? `?name=*${SearchWord}*` : ''}`);
    },
  );
  timeZones?.data?.forEach((item) => {
    timeZoneArr.push({ label: item.gmt, value: item.id });
  });
  const onSuccess = () => {
    message.success('Message Uploaded Successfully');
  };

  const onError = (data) => {
    message.error('something went wrong!');
  };
  const [uploadProgress, setUploadProgress] = useState(-1);

  const { upload, percentageValue, fileData, uploadKeyHook } = useUpload(
    onSuccess,
    onError,
  );
  // const [photo_alt, setPhoto_alt] = useState('meeting photo');
  console.log('ModalMeeting  fileData', fileData);
  const uploadSampleFile = (file) => {
    // setFileType(file.type);
    upload(file);
  };
  useEffect(() => {
    setUploadProgress(percentageValue);
    // if (fileData) {
    //   setUploadedImage(fileData.key);
    //   // setVideoView(fileData.Key);
    // }

    if (uploadKeyHook) {
      console.log('useEffect  uploadKeyHook', uploadKeyHook);

      // setUploadKey(uploadKeyHook);
    }
  }, [percentageValue, fileData, uploadKeyHook]);

  const onSuc = () => {
    setOpen(false);
    setIsModalConfirmOpen(true);
    const photo_alt = form.getFieldValue('photo_alt');
    console.log('onSuc  photo_alt:', photo_alt);
    form.resetFields();
    form.setFieldValue('photo_alt', photo_alt);
  };

  const onFinish = async (values) => {
    console.log('onFinish  values', values);

    const photo_url = fileData?.Location;
    console.log('onFinish  fileData', fileData);
    if (!photo_url) return message.error('Please upload photo!');
    console.log('onFinish  photo_url', photo_url);

    const reqData = {
      ...values,
      course: params?.course_id,
      start_date: dayjs(values?.start_date).format('MM/DD/YYYY'),
      end_date: dayjs(values?.end_date).format('MM/DD/YYYY'),
      time: dayjs(values?.time).format('hh:mm A'),
      photo_url,

      // FIXME STATIC DATA
      lang_id: 19,
      type: 0,
      is_recurring: 0,
      fees: 0,
      // photo_alt,
    };
    console.log('onFinish  reqData', reqData);
    // if (!reqData?.voice_url) delete reqData?.voice_url;

    // // console.log('onFinish  reqData', reqData);
    if (editMeeting) {
      // reqData.questionId = editMeeting?.id;
      // QAndAUpd({ reqData, onSuc });
    } else {
      yallaOnlineAdd({ reqData, onSuc });
    }
    return {};
  };
  return (
    <>
      <OwnModal
        open={open}
        onCancel={() => setOpen(false)}
        title={editMeeting ? 'Edit meeting' : 'Create a new meeting'}
        width={656}
        className={ModalMeetingStyles}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="input-holder form"
          initialValues={{ host: 'Zoom' }}
        >
          <Form.Item
            name="title"
            label="Meeting Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Please Enter Your Title" />
          </Form.Item>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="start_date"
                label="start date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    // Can not select days before today and today
                    return current && current < dayjs().startOf('day');
                  }}
                  format="MM/DD/YYYY"
                  placeholder="MM/DD/YYYY"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TimePicker
                  // defaultOpenValue={dayjs('00:00', 'hh:mm a')}
                  format="hh:mm A"
                  // placeholder="MM/DD/YYYY"
                />
              </Form.Item>
              {/* <Form.Item
                name="end_date"
                label="end date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    // Can not select days before today and today
                    return current && current < dayjs().startOf('day');
                  }}
                  format="MM/DD/YYYY"
                  placeholder="MM/DD/YYYY"
                />
              </Form.Item> */}
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true }]}
              >
                <InputNumber type="number" placeholder="Duration in minutes" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
            name="time-zone"
            label="Time Zone"
            rules={[
              {
                required: true,
                message: 'Plesae Enter Time Zone',
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Search to Select"
              showSearch
              onSearch={(searchInput) => setSearchWord(searchInput)}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              optionFilterProp="children"
              loading={timeZoneLoading}
              options={timeZoneArr}
            />
          </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please Enter here" />
          </Form.Item>

          {/* <Form.Item
            name="photo_url"
            label="Upload Image"
            rules={[{ required: false }]}
          >
            {(uploadProgress === 100 || uploadProgress === -1) && (
              <Upload
                maxCount={1}
                listType="picture"
                accept="image/png, image/jpeg, image/jpg"
                fileList={
                  fileData
                    ? [{ uid: fileData?.key, url: fileData?.Location }]
                    : []
                }
                customRequest={(file) => {
                  console.log('ModalMeeting  file:', file);
                  setPhoto_alt(
                    file?.file?.name?.split('.').slice(0, -1).join('.'),
                  );
                  uploadSampleFile(file.file);
                }}
              >
                <Button type="primary" block style={{ height: 45 }}>
                  Upload Photo
                </Button>
              </Upload>
            )}
          </Form.Item>
          {uploadProgress >= 0 && (
            <Progress
              percent={uploadProgress}
              size="small"
              style={{ marginTop: -25 }}
            />
          )} */}

          <Form.Item label="Upload Image" className="upload_image_row">
            <Row>
              <Col span={18}>
                <Form.Item name="photo_alt" rules={[{ required: true }]}>
                  <Input placeholder="Image name" disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="photo_url" rules={[{ required: false }]}>
                  {(uploadProgress === 100 || uploadProgress === -1) && (
                    <Upload
                      maxCount={1}
                      listType="picture"
                      accept="image/png, image/jpeg, image/jpg"
                      fileList={
                        fileData
                          ? [{ uid: fileData?.key, url: fileData?.Location }]
                          : []
                      }
                      customRequest={(file) => {
                        console.log('ModalMeeting  file:', file);
                        // setPhoto_alt(
                        //   file?.file?.name?.split('.').slice(0, -1).join('.'),
                        // );
                        form.setFieldValue(
                          'photo_alt',
                          file?.file?.name?.split('.').slice(0, -1).join('.'),
                        );
                        uploadSampleFile(file.file);
                      }}
                    >
                      <Button type="primary" block style={{ height: 45 }}>
                        Upload Photo
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
                {uploadProgress >= 0 && (
                  <Progress
                    percent={uploadProgress}
                    size="small"
                    style={{ marginTop: -25 }}
                  />
                )}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="host"
            label="Meeting Host"
            rules={[{ required: true }]}
          >
            <Radio.Group
              onChange={onChangeMeetingHost}
              defaultValue="Zoom"
              value={meetingHost}
            >
              <Radio value="Zoom">Zoom Meeting</Radio>
              <Radio value="Bigblue Button" disabled>
                Bigblue Button
              </Radio>
              <Radio value="Jitsi" disabled>
                Jitsi
              </Radio>
            </Radio.Group>
          </Form.Item>
          {meetingHost === 'Zoom' ? (
            <Form.Item
              name="password"
              label="Meeting Password *"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="password" placeholder="Meeting Password" />
            </Form.Item>
          ) : meetingHost === 'Bigblue Button' ? (
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="attendee_password"
                  label="Attended Password *"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input type="password" placeholder="Attended Password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="moderator_password"
                  label="Moderated Password *"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input type="password" placeholder="Moderated Password" />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <Form.Item
              name="jitsi_meeting_id"
              label="Meeting ID/Room *"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Meeting ID/Room" />
            </Form.Item>
          )}

          <Button
            type="primary"
            htmlType="submit"
            className="btn-publish"
            loading={yallaOnlineAddLod}
          >
            {editMeeting ? 'Update Meeting' : 'Create New Meeting'}
          </Button>
        </Form>
      </OwnModal>
      <ModalConfirm
        open={isModalConfirmOpen}
        onOk={() => setIsModalConfirmOpen(false)}
        title="Done!"
        subTitle={`Your Group has been successfully  ${
          editMeeting ? 'Updated' : 'Created'
        }`}
      />
    </>
  );
}

export default ModalMeeting;

// "validation": {
//   "title": "The title field is required.",
//   "duration": "The duration field is required.",
//   "course": "The course field is required.",
//   "lang_id": "The lang id field is required.",
//   "type": "The type field is required.",
//   "host": "The host field is required.",
//   "time": "The time field is required.",
//   "start_date": "The start date field is required."
// }

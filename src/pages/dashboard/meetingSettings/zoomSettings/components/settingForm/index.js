import { Form, Input, Select, Radio, message, Button } from 'antd';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetch from '../../../../../../auth/AuthInterceptor';
import { DownArrowIcon } from '../../../../../../assets/svg';
import './index.scss';
import { useZoomSettings } from '../../hooks/useZoomSettings';
import {
  normalizeDataToFields,
  normalizeErrors,
} from '../../../../myProfile/components/personalInformation/Helpers';

import SweetAlert from '../../../../../../components/common/dashboard/components/sweetAlert.js';
import { useEffect } from 'react';
const { Option } = Select;

const SettingForm = () => {
  const [form] = Form.useForm();
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [fields, setFields] = useState([]);
  const queryClient = useQueryClient();
  const [zoomSetting, setZoomSetting] = useState({});
  const onSuccess = () => {
    queryClient.invalidateQueries(`profile-info`);
    SweetAlert('Done!', 'Profile Updated Successfully');
  };

  const approvalSelect = [
    { label: 'Automatically', value: 0 },
    { label: 'Manually approve', value: 1 },
    { label: 'No registration required', value: 2 },
  ];

  const packageIdSelect = [
    { label: 'Basic (free)', value: 1 },
    { label: 'Pro', value: 2 },
    { label: 'Business', value: 3 },
    { label: 'Enterprise', value: 4 },
  ];

  const radioButtonChoices = [
    { label: 'Enable', value: 1 },
    { label: 'Disable', value: 0 },
  ];
  const onSuccessGetZoomSetting = (data) => {
    // console.log(data.data, "the returned data of getZoomSettings ");
    setZoomSetting(data.data);
  };

  useEffect(() => {
    setFields(normalizeDataToFields(zoomSetting));
    setApiKey(zoomSetting?.api_key);
    setSecretKey(zoomSetting?.api_secret);
  }, [zoomSetting]);

  const onError = (data) => {
    // form.setFields(normalizeErrors(data));
    form.scrollToField('name', { behavior: 'smooth' });
    // console.log("not worked", data);
    message.error('the Update was not successful!!');
  };
  const onErrorGetZoomSetting = (err) => {
    console.log('not worked', err);
  };

  const { isLoading: zoomSettingsIsLoading, data: getZoomSettings } = useQuery(
    [`get-zoomSettings`],
    () => {
      return fetch({
        url: `api/user/zoom-cred`,
        method: 'get',
        headers: {
          'public-request': 'true',
        },
      });
    },
    {
      onSuccess: onSuccessGetZoomSetting,
      onError: onErrorGetZoomSetting,
      // enabled: Object.keys(zoomSetting).length > 0,
    },
  );

  const { mutate: postZoomSettings, isLoading } = useZoomSettings(
    onSuccess,
    onError,
  );

  const onFinish = (values) => {
    // console.log("values", values);
    postZoomSettings(values);
  };
  const onSubmit = () => {
    // console.log("llkkd", form);
    form.submit();
  };
  // console.log("first", apiKey, secretKey);
  console.log(fields, 'fields ');
  return (
    <div className="zoom-setting-form ">
      <Form
        form={form}
        initialValues={zoomSetting}
        onFinish={onFinish}
        layout="vertical"
        hideRequiredMark
        className="dashboard-form"
        name="zoom-settings"
        fields={fields}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-card">
              <Form.Item
                name="api_key"
                label="API Key"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter API key here"
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </Form.Item>{' '}
              <Form.Item
                name="api_secret"
                label="Secret Key"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter API key here"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="approval_type"
                label="Class Join Approval"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  disabled={!apiKey || !secretKey}
                  // defaultValue="Automatically"
                >
                  <Option key={'50'} disabled selected>
                    Approval Type
                  </Option>
                  {approvalSelect.map((item) => (
                    <Option
                      key={item.value}
                      value={item.value}
                      label={item.label}
                    >
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="auto_recording"
                label="Auto Recording (For Paid Package)"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  disabled={!apiKey || !secretKey}
                >
                  <Option value="none">None</Option>
                  <Option value="local">Local</Option>
                  <Option value="cloud">Cloud</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="audio"
                label="Audio Option"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  disabled={!apiKey || !secretKey}
                >
                  <Option value="both">Both</Option>
                  <Option value="telephony">Telephony</Option>
                  <Option value="voip">Viop</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="package_id"
                label="Package"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  disabled={!apiKey || !secretKey}
                >
                  {packageIdSelect.map((item) => (
                    <Option
                      key={item.value}
                      value={item.value}
                      label={item.label}
                    >
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-card">
              <Form.Item
                className="radio-container"
                name="host_video"
                label="Host Video :"
                rules={[
                  {
                    required: true,
                    message: 'Host Video Option is required',
                  },
                ]}
              >
                <Radio.Group disabled={!apiKey || !secretKey}>
                  {radioButtonChoices.map((item) => (
                    <Radio value={item.value}>{item.label}</Radio>
                  ))}
                  {/* <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio> */}
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="participant_video"
                label="Participant Video :"
                rules={[
                  {
                    required: true,
                    message: 'participant video Option is Required',
                  },
                ]}
              >
                <Radio.Group disabled={!apiKey || !secretKey}>
                  {/* <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio> */}
                  {radioButtonChoices.map((item) => (
                    <Radio value={item.value}>{item.label}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="join_before_host"
                label="Join Before Host :"
                rules={[
                  {
                    required: true,
                    message: 'Join before Host Option is required',
                  },
                ]}
              >
                <Radio.Group disabled={!apiKey || !secretKey}>
                  {/* <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio> */}
                  {radioButtonChoices.map((item) => (
                    <Radio value={item.value}>{item.label}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="waiting_room"
                label="Waiting Room :"
                rules={[
                  {
                    required: true,
                    message: 'Waiting Room option is required',
                  },
                ]}
              >
                <Radio.Group disabled={!apiKey || !secretKey}>
                  {/* <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio> */}
                  {radioButtonChoices.map((item) => (
                    <Radio value={item.value}>{item.label}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="mute_upon_entry"
                label="Mute Upon Entry :"
                rules={[
                  {
                    required: true,
                    message: 'Mute Upon Entry Option is required',
                  },
                ]}
              >
                <Radio.Group disabled={!apiKey || !secretKey}>
                  {/* <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio> */}
                  {radioButtonChoices.map((item) => (
                    <Radio value={item.value}>{item.label}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>{' '}
            </div>
          </div>
        </div>
      </Form>
      <div className="form-actions">
        <Button type="primary" onClick={onSubmit}>
          update
        </Button>
      </div>
    </div>
  );
};

export default SettingForm;

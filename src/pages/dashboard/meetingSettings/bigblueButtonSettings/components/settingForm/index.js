import { Form, Input, Select, Radio, Button } from 'antd';
import { useState } from 'react';
import { DownArrowIcon } from '../../../../../../assets/svg';
import './index.scss';
const { Option } = Select;
const SettingForm = () => {
  const [form] = Form.useForm();
  const [securitySalt, setSecuritySalt] = useState('');
  const [serverBase, setServerBase] = useState('');
  const onFinish = (values) => {
    console.log('values', values);
  };
  const onSubmit = () => {
    console.log('llkkd', form);
    form.submit();
  };
  console.log('first', securitySalt, serverBase);
  return (
    <div className="setting-form">
      <Form
        onFinish={onFinish}
        layout="vertical"
        hideRequiredMark
        className="dashboard-form"
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-card">
              <Form.Item
                name="securitySalt"
                label="BBB Security Salt"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter BBB Security Salt"
                  onChange={(e) => setSecuritySalt(e.target.value)}
                />
              </Form.Item>{' '}
              <Form.Item
                name="serverBase"
                label="BBB Server Base URL"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter BBB Server Base URL"
                  onChange={(e) => setServerBase(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="passwordLength"
                label="Password Length"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Password Length"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="DialNumber"
                label="Dial Number"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Dial Number"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="LogoutUrl"
                label="Logout Url"
                rules={[{ required: true }, { type: 'url' }]}
              >
                <Input
                  placeholder="Enter Logout Url"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="Duration"
                label="Duration"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Duration"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="ModeratorMessage"
                label="Moderator Only Message"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Moderator Only Message"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="Copyright"
                label="Copyright"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Copyright"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="WelcomeMessage"
                label="Welcome Message"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Welcome Message"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <Form.Item
                name="MaxParticipants"
                label="Max Participants 0=Unlimited"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter Max Participants"
                  disabled={!securitySalt || !serverBase}
                />
              </Form.Item>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="State"
                    label="State"
                    rules={[{ required: true }]}
                  >
                    <Select
                      allowClear={false}
                      suffixIcon={<DownArrowIcon />}
                      disabled={!securitySalt || !serverBase}
                    >
                      <Option value="Any">Any</Option>
                      <Option value="Published">Published</Option>
                      <Option value="Un Published">Un Published</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="GuestPolicy"
                    label="Guest Policy"
                    rules={[{ required: true }]}
                  >
                    <Select
                      allowClear={false}
                      suffixIcon={<DownArrowIcon />}
                      disabled={!securitySalt || !serverBase}
                    >
                      <Option value="AlwaysAccept">Always Accept</Option>
                      <Option value="AlwaysDeny">Always Deny</Option>
                      <Option value="Un Published">Ask moderator</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-card">
              {' '}
              <Form.Item
                className="radio-container"
                name="AllowRecording :"
                label="Allow Start Stop Recording :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockSettingsDisable"
                label="Lock Settings Disable Mic :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockSettingsDisablePublic"
                label="Lock Settings Disable Public Chat :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockSettingsLockedLayout "
                label="Lock Settings Locked Layout :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockOnJoinConfigurable"
                label="Lock On Join Configurable :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="Redirect"
                label="Redirect :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="Record"
                label="Record :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="IsBreakout"
                label="Is Breakout :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="AutoStartRecoding"
                label="Auto Start Recoding :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="WebcamsOnlyForModerator"
                label="Webcams Only For Moderator :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="MuteOnStart"
                label="Mute On Start :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockSettingsDisablePrivateChat"
                label="Lock Settings Disable Private Chat :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockSettingsDisableNote"
                label="Lock Settings Disable Note :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="LockSettingsLockOnJoin"
                label="Lock Settings Lock On Join :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
              <Form.Item
                className="radio-container"
                name="JoinViaHtml5"
                label="Join Via Html 5 :"
              >
                <Radio.Group disabled={!securitySalt || !serverBase}>
                  <Radio value="1">Enable</Radio>
                  <Radio value="0">Disable</Radio>
                </Radio.Group>
              </Form.Item>{' '}
            </div>
          </div>
        </div>
      </Form>
      <div className="form-actions">
        <Button type="primary" className="save" onClick={onSubmit}>
          update
        </Button>
      </div>
    </div>
  );
};

export default SettingForm;

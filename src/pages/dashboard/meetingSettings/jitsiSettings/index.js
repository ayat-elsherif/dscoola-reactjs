import { Button, Form, Input } from 'antd';
import './index.scss';
const JitsiSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('values', values);
  };
  const onSubmit = () => {
    console.log('llkkd', form);
    form.submit();
  };
  return (
    <div className="jitsi-settings">
      {' '}
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">Jitsi Setting</h3>
        </div>
      </div>
      <div className="jitsi-card">
        <Form
          onFinish={onFinish}
          layout="vertical"
          hideRequiredMark
          className="dashboard-form"
        >
          <Form.Item
            name="JitsiServer"
            label="Jitsi Server Base URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="https://meet.jit.si/Scoola" />
          </Form.Item>{' '}
        </Form>
      </div>
      <div className="form-actions">
        <Button type="primary" className="save" onClick={onSubmit}>
          update
        </Button>
      </div>
    </div>
  );
};

export default JitsiSettings;

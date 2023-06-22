import { Form, Input, message } from 'antd';
import React from 'react';
import Swal from 'sweetalert2';
import DashboardButton from '../../../../../../components/common/dashboard/components/button';
import SweetAlert from '../../../../../../components/common/dashboard/components/sweetAlert.js';
import { useResetPassword } from '../hooks/useResetPassword';
import './index.scss';
const ChangePasswordForm = ({ callBack }) => {
  const onSuccess = (data) => {
    console.log('successdata', data);
    form.resetFields();
    SweetAlert('Done!', data.data.msg);
    callBack();
  };
  const onError = (data) => {
    message.error('Invalied Password');
  };
  const { mutate: resetPass, isLoading } = useResetPassword(onSuccess, onError);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    resetPass(values);
  };
  const onSubmit = () => {
    form.submit();
  };
  return (
    <div className="change-pass-form">
      <p>New Password</p>{' '}
      <div className="row">
        <div className="col-md-6">
          <Form
            layout="vertical"
            name="changePass-form"
            className="dashboard-form"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="old_password"
              label="Current Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Enter your current password"
              />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="New Password"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
                  ),
                  message: 'not valid',
                },
              ]}
            >
              <Input type="password" placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              name="new_password_confirmation"
              label="Confirm Password"
              dependencies={['new_password']}
              rules={[
                // {
                //   required: true,
                // },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error(`two path does not match`));
                  },
                }),
              ]}
            >
              <Input
                type="password"
                placeholder="Enter Your Current Password"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-6">
          <div className="password-rules">
            <h3>Rules for password</h3>
            <p>
              To create an unique password, you have to meet of the following
              requirements
            </p>
            <div className="rule">
              <span></span>Minimum 8 character.
            </div>
            <div className="rule">
              <span></span>1 uppercase, 1 lowercase.
            </div>

            {/* <div className='rule'>
              <span></span>At least one special character
            </div> */}
            <div className="rule">
              <span></span>At least one number.
            </div>
          </div>
          <div className="form-actions">
            <DashboardButton
              text="Save"
              onclick={onSubmit}
              type="link"
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

import { UserOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Upload,
} from 'antd';
import { UploadCerIcon } from 'assets/svg';
import dayjs from 'dayjs';
import useApi from 'network/useApi';
import { useUpload } from 'pages/instrcutorDashboard/courses/components/createCourse/steps/courseDetails/hooks/useUploade';
import React, { useEffect } from 'react';
import { useState } from 'react';

const AddCompany = ({ close, cerId }) => {
  console.log(cerId, 'addcomp');

  const [photo, setPhoto] = useState([]);
  const [isCurrentJob, setIsCurrentJob] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [imageView, setImageView] = useState(null);
  const queryClient = useQueryClient();
  const api = useApi();
  const [form] = Form.useForm();

  const { upload, percentageValue, fileData, uploadKeyHook } = useUpload();
  useEffect(() => {
    if (fileData) {
      setImageId(fileData.key);
      setImageView(fileData.Location);
    }
  }, [percentageValue, fileData, uploadKeyHook]);
  const uploadSampleFile = (file) => {
    upload(file);
  };
  const uploadProps = {
    showUploadList: false,
    name: 'image',
    accept: 'image/x-png,image/gif,image/jpeg',
    fileList: photo,
    customRequest: (file) => uploadSampleFile(file.file),
  };
  const onFinish = (values) => {
    setLoading(true);
    values.currently_working_here = isCurrentJob;
    values.company_logo = imageId;
    api
      .post('instructor/work-experience', values)
      .then(() => {
        queryClient.invalidateQueries([`work-experience`]);
        form.resetFields();
        close();
        setLoading(false);
        message.success('add successfully');
      })
      .catch(() => {
        setLoading(false);
        message.error('something went wrong');
      });
  };
  const disableNext = (current) => {
    return current && current > dayjs().endOf('day');
  };
  const disablePast = (current) => {
    return current && current < dayjs().endOf('day');
  };

  return (
    <Form
      form={form}
      className="add-certificate-form"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="company Logo"
        rules={[
          {
            required: true,
            message: 'Please input your Company logo!',
          },
        ]}
      >
        <div className="profil-photo-conrainer">
          <Row align="middle" gutter={[16]}>
            <Col>
              <Avatar
                size={64}
                icon={
                  imageView ? (
                    <img src={imageView} alt="Profile" />
                  ) : (
                    <UploadCerIcon />
                  )
                }
              />
            </Col>
            <Col>
              <Upload {...uploadProps}>
                <Button type="primary" className="main-btn-dashboard">
                  Browse
                </Button>
              </Upload>
            </Col>
          </Row>
        </div>
      </Form.Item>
      <Form.Item
        label="Title"
        name="job_title"
        rules={[
          {
            required: true,
            message: 'Please input The Title!',
          },
        ]}
      >
        <Input placeholder="EX : Ui/Ux designer" />
      </Form.Item>
      <Form.Item
        label="Company name"
        name="company_name"
        rules={[
          {
            required: true,
            message: 'Please input Company name!',
          },
        ]}
      >
        <Input placeholder="EX : Information technology institude" />
      </Form.Item>
      <Form.Item
        label="Start date"
        name="start_date"
        rules={[
          {
            required: true,
            message: 'Please input Start date!',
          },
        ]}
      >
        <DatePicker disabledDate={disableNext} placeholder="03/26" />
      </Form.Item>

      {!isCurrentJob && (
        <Form.Item label="End Date" name="end_date">
          <DatePicker disabledDate={disablePast} placeholder="03/26" />
        </Form.Item>
      )}
      <Checkbox
        checked={isCurrentJob}
        onChange={(e) => setIsCurrentJob(e.target.checked)}
      >
        I am currently working in this role
      </Checkbox>
      <Row justify="end">
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default AddCompany;

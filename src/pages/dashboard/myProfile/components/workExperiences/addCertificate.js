import { UserOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Button,
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
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { normalizeDataToFields } from '../personalInformation/Helpers';

const AddCertificate = ({ close, expId }) => {
  console.log(expId, 'addcer');
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState();
  const [imageId, setImageId] = useState(null);
  const [form] = Form.useForm();
  const [imageView, setImageView] = useState(null);
  const [fields, setFields] = useState([]);
  const [expiration, setExpiration] = useState();
  const queryClient = useQueryClient();

  const api = useApi();
  const { upload, fileData, uploadKeyHook } = useUpload();
  useEffect(() => {
    if (fileData) {
      setImageId(fileData.key);
      setImageView(fileData.Location);
      console.log(fileData.Location, 'd;kfgeg');
    }
  }, [fileData, uploadKeyHook]);
  const uploadSampleFile = (file) => {
    upload(file);
  };

  const uploadProps = {
    showUploadList: false,
    name: 'image',
    accept: 'image/x-png,image/gif,image/jpeg',

    customRequest: (file) => uploadSampleFile(file.file),
  };

  const onFinish = (values) => {
    setLoading(true);
    values.issue_date = issue;
    values.expiration = expiration;
    values.image = imageId;
    expId
      ? api
          .put(`instructor/certificate/${expId}`, values)
          .then(() => {
            queryClient.invalidateQueries([`certificate`]);
            setLoading(false);
            form.resetFields();
            message.success('Edited successfully');
            close();
          })
          .catch(() => {
            setLoading(false);
            message.error('something went wrong');
          })
      : api
          .post(`instructor/certificate`, values)
          .then(() => {
            queryClient.invalidateQueries([`certificate`]);
            setLoading(false);
            form.resetFields();
            message.success('add successfully');
            close();
          })
          .catch(() => {
            setLoading(false);
            message.error('something went wrong');
          });
  };
  const disableNext = (current) => {
    return current && current > dayjs().endOf('day');
  };
  const onnGetAnnById = (data) => {
    console.log(data, 'skd;jfsd');
    setFields(normalizeDataToFields(data?.data));
    setIssue(data?.data?.issue_date);
    setExpiration(data?.data?.expiration);

    setImageView(
      'https://dscoola-files.s3.eu-west-1.amazonaws.com/' + data?.data?.image,
    );
    setImageId(data?.data?.image);
  };

  const { isLoading: returnedDataLoading } = useQuery(
    [`get-cer-by-id`, expId],
    () => {
      return api.get(`instructor/certificate/${expId}`);
    },
    {
      disabled: !!expId,
      cacheTime: 0,
      refetchOnMount: true,
      staleTime: 0,
      onSuccess: onnGetAnnById,
    },
  );

  return (
    <Form
      form={form}
      fields={fields}
      className="add-certificate-form"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="ddd"
        label="Certification image"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input your Certification image!',
        //   },
        // ]}
      >
        <div className="profil-photo-conrainer">
          <Row align="middle" gutter={[16]}>
            <Col>
              {' '}
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
        label="Certification name"
        name="certificate_name"
        rules={[
          {
            required: true,
            message: 'Please input your Certification name!',
          },
        ]}
      >
        <Input placeholder="EX : Certified information technology" />
      </Form.Item>
      <Form.Item
        label="Provider"
        name="provider"
        rules={[
          {
            required: true,
            message: 'Please input Provider!',
          },
        ]}
      >
        <Input placeholder="EX : Information technology institude" />
      </Form.Item>
      <Form.Item
        label="Issue date"
        name="issue_date2"
        rules={[
          {
            required: true,
            message: 'Please input Issue date!',
          },
        ]}
      >
        <DatePicker
          disabledDate={disableNext}
          onChange={(data, dateString) => setIssue(dateString)}
          placeholder="03/26"
        />
      </Form.Item>
      <Form.Item label="expiration date (optional)">
        <DatePicker
          // disabledDate={disablePast}
          picker="year"
          onChange={(data, dateString) => {
            setExpiration(dateString);
            console.log(dateString);
          }}
          placeholder="2006"
        />
      </Form.Item>
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

export default AddCertificate;

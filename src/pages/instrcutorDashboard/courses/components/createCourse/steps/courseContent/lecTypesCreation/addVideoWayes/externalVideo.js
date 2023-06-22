import { Button, Form, Input, message, Row, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchopenAddLecTypesForm } from '../../../../../../../../../features/courseContent/courseContentSlice';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useApi from '../../../../../../../../../network/useApi';
import DashboardButton from 'components/common/dashboard/components/button';

const ExternalVideo = ({ lectuer, sectionId, onEdit }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [postLoading, setPostLoading] = useState(false);
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const api = useApi();
  const onFinish = (values) => {
    // values.duration = duration;
    values.item_type = 'lecture';
    values.file_url = {
      video_src: url,
      video_upload_type: 'external',
      video_type: 'video/mp4',
    };
    values.type = 'video';
    setPostLoading(true);
    api
      .put(`lecture/section/${sectionId}/lecture/${lectuer.id}`, values)
      .then(() => {
        setPostLoading(false);
        message.success('add successfully!');
        queryClient.invalidateQueries([`get-course-content`]);
        dispatch(fetchopenAddLecTypesForm('close'));
      })
      .catch(() => {
        setPostLoading(false);
      });
  };

  const onGetSubCatSuccess = (data) => {
    if (data.data[0].items.video.video_src.video_upload_type === 'external') {
      form.setFieldsValue({
        duration: data.data[0].items.video.duration.slice(0, -3),
        url: data.data[0].items.video.video_src.video_src,
      });
      setUrl(data.data[0].items.video.video_src.video_src);
    }
  };
  const onError = (data) => {
    message.error('something went wrong!');
  };
  useQuery(
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
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {/* <Form.Item
        label="Title:"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please Enter Lectuer Title!',
          },
        ]}
      >
        <Input placeholder="Enter Lectuer Title" />
      </Form.Item> */}
      <Form.Item
        label="URL:"
        name="url"
        rules={[
          {
            required: true,
            message: 'Please Enter Lectuer Url!',
          },
        ]}
      >
        <Input
          size="large"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter https://example.com"
        />
      </Form.Item>
      {/* <Form.Item label="objective:" name="objective">
        <Input placeholder="Enter Lectuer objective" />
      </Form.Item> */}

      <Form.Item
        label="Video Time(ex. HH:MM) :"
        name="duration"
        rules={[
          {
            required: true,
            message: 'Please Enter Lectuer Duration!',
          },
          {
            type: 'string',
            pattern: /^([0-9]?[0-9]|2[0-9]):[0-5][0-9]$/,
            message: 'Must match the format 01:30',
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item className="actions-form-items">
        <Row justify="end" className="pt-5">
          <Button htmlType="submit" type="primary" loading={postLoading}>
            Save
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default ExternalVideo;

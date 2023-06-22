import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { fetchopenAddLecTypesForm } from 'features/courseContent/courseContentSlice';
import useApi from 'network/useApi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LiveCourseSession = ({ lectuer, sectionId }) => {
  console.log(lectuer, 'bjkhugvv');
  const api = useApi();
  const [sessionValue, setSessionValue] = useState();
  const [postLoading, setPostLoading] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const currentBundle = useSelector(
    (state) => state.currentBundle?.currentBundle,
  );
  const { data: sessions, isLoading } = useQuery(
    [`get-bundle-by-id`, currentBundle],
    () => {
      return api.get(`lecture/bundle/${currentBundle}`);
    },
    { enabled: !!currentBundle },
  );
  const sessionLoading = isLoading && !!currentBundle;
  var bundleSessionsArr = [];
  bundleSessionsArr.unshift({
    label: 'Custom Session',
    value: -1,
  });
  if (!!sessions) {
    sessions?.data?.bundleSessions?.forEach((item) => {
      bundleSessionsArr.push({
        label: dayjs(item.start_date).format('MMM DD, YYYY'),

        value: item.id,
      });
    });
  }

  console.log(sessions?.data?.bundle?.id, 's;iefjpwe');
  const onFinish = (values) => {
    setPostLoading(true);
    values.type = 'livesession';
    values.item_type = 'lecture';
    values.bundle_id = sessions?.data?.bundle?.id;

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
        message.error('something went wrong!');
      });
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="live-course-session-form"
    >
      <Form.Item
        name="bundle_session_id"
        label="Choose Your Session"
        rules={[
          {
            required: true,
            message: 'Please Select Session',
          },
        ]}
      >
        <Select
          size="large"
          loading={sessionLoading}
          placeholder="12 Mar 2023"
          onChange={(value) => setSessionValue(value)}
          options={bundleSessionsArr}
        ></Select>
      </Form.Item>
      {sessionValue === -1 && (
        <Form.Item
          name="attachment_url"
          label="Meeting Link"
          rules={[
            {
              required: true,
              message: 'Please Enter Meeting Link',
            },
          ]}
        >
          <Input placeholder="Enter your link" size="large"></Input>
        </Form.Item>
      )}

      <Row className="pt-5" justify="end">
        <Button htmlType="submit" loading={postLoading} type="primary">
          {' '}
          Save{' '}
        </Button>
      </Row>
    </Form>
  );
};

export default LiveCourseSession;

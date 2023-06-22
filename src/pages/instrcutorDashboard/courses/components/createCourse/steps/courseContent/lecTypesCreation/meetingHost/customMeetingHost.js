import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import {
  fetchaddDesc,
  fetchopenAddLecTypesForm,
} from 'features/courseContent/courseContentSlice';
import useApi from 'network/useApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const CustomMeetingHost = ({ lectuer, sectionId }) => {
  const [form] = Form.useForm();
  const [SearchWord, setSearchWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  var timeZoneArr = [];
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const { data: timeZones, isLoading: timeZoneLoading } = useQuery(
    [`get-time-zones`, SearchWord],
    () => {
      return api.get(`timezones${SearchWord ? `?name=*${SearchWord}*` : ''}`);
    },
  );
  timeZones?.data?.forEach((item) => {
    timeZoneArr.push({ label: item.gmt, value: item.id });
  });

  const onFinish = (values) => {
    setLoading(true);
    const data = {};
    data.duration = `${values.duration_hr}:${values.duration_min}`;
    data.start_time =
      dayjs(values.start_date).format('YYYY-MM-DD') +
      ' ' +
      dayjs(values.start_time).format('hh:mm:ss');
    data.time_zone_id = values.time_zone_id;
    data.title = values.title;
    data.meeting_link = values.meeting_link;
    // data.type = 'livesession';
    // data.item_type = 'lecture';
    api
      .put(
        `lecture/section/${sectionId}/lecture/${lectuer.id}/custom-livesession`,
        data,
      )
      .then(() => {
        setLoading(false);
        message.success('Add Successfully');
        queryClient.invalidateQueries([`get-course-content`]);
        dispatch(fetchaddDesc('close'));
        dispatch(fetchopenAddLecTypesForm('close'));
      })
      .catch(() => {
        setLoading(true);
        message.error('Something Went Wrong!');
      });
  };
  const onSubmit = () => {
    form.submit();
  };
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          {' '}
          <Form.Item label="Meeting Title" name="title">
            <Input placeholder="Please Enter Your Title"></Input>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="start_date"
            label="Date"
            rules={[
              {
                required: true,
                message: 'Plesae Enter Start Date',
              },
            ]}
          >
            <DatePicker disabledDate={disabledDate} placeholder="Select Date" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="start_time"
            label="Time"
            rules={[
              {
                required: true,
                message: 'Plesae Enter Start Time',
              },
            ]}
          >
            <TimePicker
              size="large"
              use12Hours
              placeholder="Select Time"
              showTime={{ format: 'HH:mm' }}
              //   onChange={handelChangeTime}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            name="duration_hr"
            label="Duration (hr)"
            rules={[
              {
                required: true,
                message: 'Plesae Enter Duration In Hours',
              },
            ]}
          >
            <Select
              placeholder="0"
              size="large"
              options={[
                {
                  value: 0,
                  label: '0',
                },
                {
                  value: 1,
                  label: '1',
                },
                {
                  value: 2,
                  label: '2',
                },
                {
                  value: 3,
                  label: '3',
                },
                {
                  value: 4,
                  label: '4',
                },
                {
                  value: 5,
                  label: '5',
                },
                {
                  value: 6,
                  label: '6',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            name="duration_min"
            label="Duration (min)"
            rules={[
              {
                required: true,
                message: 'Plesae Enter Duration In Min ',
              },
            ]}
          >
            <Select
              size="large"
              placeholder="0"
              options={[
                {
                  value: 0,
                  label: '0',
                },
                {
                  value: 15,
                  label: '15',
                },
                {
                  value: 30,
                  label: '30',
                },
                {
                  value: 45,
                  label: '45',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="time_zone_id"
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

        <Col span={24}>
          <Form.Item name="meeting_link" label="Meeting Link">
            <Input size="large" placeholder="Enter Meeting Link"></Input>
          </Form.Item>
        </Col>
        <Col span={24} className="pb-5">
          <Row justify="end">
            <Button onClick={onSubmit} type="primary" loading={loading}>
              Create New Meeting
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default CustomMeetingHost;

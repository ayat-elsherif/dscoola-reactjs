import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import useApi from 'network/useApi';
import { useState } from 'react';

const ZoomMeetingHost = () => {
  const [form] = Form.useForm();
  const [SearchWord, setSearchWord] = useState(null);
  const [recurringType, setRecurringType] = useState();
  const [dialy, setDialy] = useState(null);
  const [endRadio, setEndRadio] = useState(1);

  const api = useApi();
  var timeZoneArr = [];
  let endAfter = [];
  for (let i = 1; i < 13; i++) {
    endAfter.push({ label: i, value: i });
  }
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

  return (
    <Form
      layout="vertical"
      // onFinish={onFinish}
      form={form}
    >
      <Row gutter={[16, 16]}>
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
            name="time_zone"
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
          <Form.Item name="description" label="Description">
            <Input size="large" placeholder="Enter Description"></Input>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="Recurring" label="Recurring">
            <Radio.Group
              onChange={(e) => setRecurringType(e.target.value)}
              value={recurringType}
            >
              <Row>
                <Col span={4}>
                  <Radio value={1}>yes</Radio>
                </Col>
                <Col>
                  <Radio value={0}>no</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Col>
        {recurringType === 1 && (
          <>
            <Col xs={24} md={16}>
              <Form.Item
                name="type"
                label="Recurring Type"
                rules={[
                  {
                    required: true,
                    message: 'Plesae Select Recurring Type',
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select Recurring Type"
                  onChange={(vlaue) => {
                    setDialy(vlaue);
                  }}
                  options={[
                    {
                      value: 1,
                      label: 'Dialy',
                    },
                    {
                      value: 2,
                      label: 'Weekly',
                    },
                    {
                      value: 3,
                      label: 'Monthly',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="repeat_interval"
                label="Repeat Every"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select size="large" placeholder="0" options={endAfter} />
              </Form.Item>
            </Col>

            <Col style={{ paddingTop: '43px' }} xs={24} md={2}>
              {dialy === 1 && 'Day(s)'}
              {dialy === 2 && 'Week(S)'}
              {dialy === 3 && 'Month'}
            </Col>
            <Col xs={12} md={24}>
              {' '}
              <Radio.Group
                onChange={(e) => setEndRadio(e.target.value)}
                value={endRadio}
              >
                <Row className="end-time-radio">
                  <Col xs={24} md={8}>
                    {' '}
                    <Radio style={{ width: '100%' }} value={1}>
                      <Form.Item name="end_after" label="End After">
                        <Select
                          size="large"
                          placeholder="Select Occurrences"
                          options={endAfter}
                        />
                      </Form.Item>
                    </Radio>
                  </Col>
                  <Col xs={24} md={6} style={{ paddingTop: '51px' }}>
                    After Occurrences
                  </Col>
                  <Col xs={24} md={10}>
                    {' '}
                    <Radio style={{ width: '100%' }} value={2}>
                      <Form.Item name="end_date" label="End Date">
                        <DatePicker
                          size="large"
                          disabledDate={disabledDate}
                          placeholder="Select date"
                        />
                      </Form.Item>
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
          </>
        )}
        <Col span={24} className="pb-5">
          <Row justify="end">
            <Button htmlType="supmit" type="primary">
              Create New Meeting
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ZoomMeetingHost;

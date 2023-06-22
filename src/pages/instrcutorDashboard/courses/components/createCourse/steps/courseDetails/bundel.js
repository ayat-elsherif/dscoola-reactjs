import { InfoCircleOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
  Tooltip,
} from 'antd';
import Search from 'antd/es/transfer/search';
import { InfoIcon } from 'assets/svg';
import { Loading } from 'components/common/Loading';
import dayjs from 'dayjs';
import useApi from 'network/useApi';
import React, { useState } from 'react';
import ReturnedBundels from './returnedBundels';

const Bundel = ({ isclosable, close, id }) => {
  const courseId = localStorage.getItem('live-course-id');
  const queryClient = useQueryClient();
  const api = useApi();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [endRadio, setEndRadio] = useState(1);
  const [monthlyRadio, setMonthlyRadio] = useState(1);
  const [SearchWord, setSearchWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialy, setDialy] = useState(null);
  const [occurs, setOccurs] = useState('');

  var timeZoneArr = [];

  const weekDays = [
    { label: 'Sun', value: 1 },
    { label: 'Mon', value: 2 },
    { label: 'Tue', value: 3 },
    { label: 'Wed', value: 4 },
    { label: 'Thu', value: 5 },
    { label: 'Fri', value: 6 },
    { label: 'Sat', value: 7 },
  ];
  const weekNum = [
    { label: 'First', value: 1 },
    { label: 'Secound', value: 2 },
    { label: 'Third  ', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Last', value: -1 },
  ];
  let monthDays = [];
  let endAfter = [];
  for (let i = 1; i < 32; i++) {
    monthDays.push({ label: i, value: i });
  }
  for (let i = 1; i < 13; i++) {
    endAfter.push({ label: i, value: i });
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  const onFinish = (values) => {
    setLoading(true);

    const data = {
      duration: values.duration_min + values.duration_hr * 60,
      start_date: values.start_date,
      time_zone_id: values.time_zone,
      start_time: dayjs(values.start_time).format('hh:mm:ss'),
      course_id: localStorage.getItem('live-course-id'),
      type: values.type,
      repeat_interval: values.repeat_interval,

      max_attends: values.max_attends,

      password: values.password,
    };

    if (values.password.length > 10) {
      message.error('the password may not be greater than 10 characters.');
      setLoading(false);
      return;
    }
    if (values.type === 2) {
      if (!occurs) {
        message.error('please select occurs on days');
        setLoading(false);
        return;
      }
      data.weekly_days = occurs;
    }
    if (endRadio === 1) {
      if (!values.end_after) {
        message.error('please enter end after day');
        setLoading(false);
        return;
      }
      data.end_times = values.end_after;
    }
    if (endRadio === 2) {
      if (!values.end_date) {
        message.error('please enter end date');
        setLoading(false);
        return;
      }
      data.end_date = values.end_date;
    }
    if (values.type === 3) {
      if (monthlyRadio === 1) {
        if (!values.monthly_day) {
          message.error('please enter monthly day');
          setLoading(false);
          return;
        }
        data.monthly_day = values.monthly_day;
      }
      if (monthlyRadio === 2) {
        if (!values.monthly_week || !values.monthly_week_day) {
          message.error('please enter occurs on info');
          setLoading(false);
          return;
        }
        data.monthly_week = values.monthly_week;
        data.monthly_week_day = values.monthly_week_day;
      }
    }
    if (values.start_date >= values.end_date) {
      message.error('The end date must be a date after start date.');
      setLoading(false);
      return;
    }

    id
      ? api
          .put(`lecture/bundle/${id}`, data)
          .then(() => {
            queryClient.invalidateQueries([`get-bundles`]);
            close();
            setLoading(false);
            message.success('Edited Successfully!');
          })
          .catch(() => {
            setLoading(false);
            message.error('something went wrong!');
          })
      : api
          .post(`lecture/course/${courseId}/setup-details/bundle`, data)
          .then(() => {
            queryClient.invalidateQueries([`get-bundles`]);
            close();
            setLoading(false);
            message.success('Add Successfully!');
          })
          .catch(() => {
            setLoading(false);
            message.error('something went wrong!');
          });
  };
  const onSubmit = () => {
    form.submit();
  };

  // get time zones

  const { data: timeZones, isLoading: timeZoneLoading } = useQuery(
    [`get-time-zones`, SearchWord],
    () => {
      return api.get(`timezones${SearchWord ? `?name=*${SearchWord}*` : ''}`);
    },
  );

  timeZones?.data?.forEach((item) => {
    timeZoneArr.push({ label: item.gmt, value: item.id });
  });

  //draw data

  const onSuccess = (data) => {
    console.log(data, 'WEdwefwfe');
    form.setFieldsValue({
      max_attends: data?.data?.bundle?.max_attends,
      type: data?.data?.bundle?.type,
      duration_min: data?.data?.bundle?.duration % 60,
      duration_hr: Math.trunc(data?.data?.bundle?.duration / 60),
      end_date: data?.data?.bundle?.end_date
        ? dayjs(data?.data?.bundle?.end_date, 'YYYY-MM-DD')
        : null,
      end_after: data?.data?.bundle?.end_times,

      repeat_interval: data?.data?.bundle?.repeat_interval,

      start_date: data?.data?.bundle?.start_date
        ? dayjs(data?.data?.bundle?.start_date, 'YYYY-MM-DD')
        : null,

      start_time: data?.data?.bundle?.start_time
        ? dayjs(data?.data?.bundle?.start_time, 'HH:mm')
        : null,

      time_zone: data?.data?.bundle?.time_zone_id,
      occursChecks: JSON.parse('[' + data?.data?.bundle?.weekly_days + ']'),

      // weekly_days,

      // duration: values.duration_min + values.duration_hr * 60,

      // day1: data?.data?.bundle?.day1,
      // day2: data?.data?.bundle?.day2,
      // time_from: dayjs(data?.data?.bundle?.time_from).format('hh mm ss'),
      // start_date: dayjs(data?.data?.start_date, 'YYYY-MM-DD'),
      //   start_date: dayjs(data?.data?.start_date).format('DD MM YYYY'),
    });
    setDialy(data?.data?.bundle?.type);
    // setOccurs([1, 2, 6]);
  };

  useQuery(
    [`get-bundle-by-id`, id],
    () => {
      return api.get(`lecture/bundle/${id}`);
    },
    {
      onSuccess,
      enabled: !!id,
    },
  );

  return (
    <>
      <>
        {' '}
        {!id && (
          <Row gutter={[8]} className="pt-4">
            <Col>
              <h4>Course bundles</h4>
            </Col>
            <Col>
              {' '}
              <Tooltip title="your available bundles that provide your course dates.">
                <InfoIcon />
              </Tooltip>
            </Col>
          </Row>
        )}
        <div className="bundel-container">
          <Form
            className="form-bundel"
            layout="vertical"
            onFinish={onFinish}
            form={form}
            fields={fields}
          >
            {/* <h4>The first bundle</h4> */}
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="start_date"
                  label="Start Date"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Enter Start Date',
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    placeholder="Select Date"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="start_time"
                  label="Start Time"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Enter Start Time',
                    },
                  ]}
                >
                  <TimePicker
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
                  <Select placeholder="0" options={endAfter} />
                </Form.Item>
              </Col>

              <Col style={{ paddingTop: '43px' }} xs={24} md={2}>
                {dialy === 1 && 'Day(s)'}
                {dialy === 2 && 'Week(S)'}
                {dialy === 3 && 'Month'}
              </Col>
              {(dialy === 2 || dialy === 3) && (
                <Col span={24}>
                  <Form.Item
                    name="occurs-On"
                    label="Occurs On"
                    // rules={[
                    //   {
                    //     required: true,
                    //     // message: 'Plesae Select Recurring Type',
                    //   },
                    // ]}
                  >
                    {dialy === 2 && (
                      <Form.Item name="occursChecks">
                        <Checkbox.Group
                          options={weekDays}
                          onChange={(checkedValues) => {
                            setOccurs(checkedValues);
                          }}
                        />
                      </Form.Item>
                    )}
                    {dialy === 3 && (
                      <Radio.Group
                        onChange={(e) => setMonthlyRadio(e.target.value)}
                        value={monthlyRadio}
                      >
                        <Space direction="vertical">
                          <Radio value={1}>
                            <Row gutter={[8]}>
                              <Col xs={24} md={7}>
                                <Form.Item name="monthly_day" label=" ">
                                  <Select options={monthDays} />
                                </Form.Item>
                              </Col>
                              <Col span={16} style={{ paddingTop: '39px' }}>
                                Day of the month
                              </Col>
                            </Row>
                          </Radio>
                          <Radio value={2}>
                            <Row gutter={[8]}>
                              <Col xs={24} md={7}>
                                <Form.Item name="monthly_week" label=" ">
                                  <Select
                                    placeholder="secound"
                                    options={weekNum}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={7}>
                                <Form.Item name="monthly_week_day" label=" ">
                                  <Select
                                    placeholder="sun"
                                    options={weekDays}
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={10} style={{ paddingTop: '39px' }}>
                                Day of the month
                              </Col>
                            </Row>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              )}
              <Col xs={12} md={24}>
                {' '}
                <Radio.Group
                  onChange={(e) => setEndRadio(e.target.value)}
                  value={endRadio}
                >
                  <Row className="end-time-radio-creation">
                    <Col xs={24} md={10}>
                      {' '}
                      <Radio value={1}>
                        <Form.Item name="end_after" label="End After">
                          <Select
                            placeholder="Select Occurrences"
                            options={endAfter}
                          />
                        </Form.Item>
                      </Radio>
                    </Col>
                    <Col xs={24} md={4} style={{ paddingTop: '43px' }}>
                      Occurrences
                    </Col>
                    <Col xs={24} md={10}>
                      {' '}
                      <Radio value={2}>
                        <Form.Item name="end_date" label="End Date">
                          <DatePicker
                            disabledDate={disabledDate}
                            placeholder="Select date"
                          />
                        </Form.Item>
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Add Password!',
                    },

                    // {
                    //   pattern: new RegExp('^(.{10,})$'),

                    //   message:
                    //     'the password may not be greater than 10 characters.',
                    // },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              </Col>

              <Col>
                <h5>Number of attends</h5>
                <h6>
                  Select number of students that can attend this bundles max
                  number 100
                </h6>
              </Col>
              <Col xs={24} md={24}>
                <Row justify="space-between" align="bottom" gutter={[16, 16]}>
                  <Col className="pb-4">
                    {' '}
                    <Form.Item
                      name="max_attends"
                      label="Limit number"
                      rules={[
                        {
                          required: true,
                          message: 'Plesae Enter Limit number',
                        },
                        //
                        {
                          pattern: new RegExp('^(0*(?:[1-9][0-9]?|100))$'),
                          message: 'Limit number must be between 1 and 100',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Type Number of Attends"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="pb-4">
                    <Row gutter={[16, 16]}>
                      {isclosable && (
                        <Col>
                          <Form.Item>
                            <Button onClick={close}>Close</Button>
                          </Form.Item>
                        </Col>
                      )}

                      <Col>
                        <Form.Item>
                          <Button
                            loading={loading}
                            type="primary"
                            onClick={onSubmit}
                          >
                            {id ? 'Edit' : 'Create'}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    </>
  );
};

export default Bundel;

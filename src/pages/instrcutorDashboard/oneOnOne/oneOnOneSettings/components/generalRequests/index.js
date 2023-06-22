import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  TimePicker,
  Row,
  Col,
  message,
  Menu,
  Dropdown,
} from 'antd';
import Modal from 'antd/es/modal/Modal';
import { Closecon } from 'assets/svg';
import dayjs from 'dayjs';
import useApi from 'Hooks/network/useApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardButton from '../../../../../../components/common/dashboard/components/button';
import './index.scss';

const { Option } = Select;

function GeneralRequests({ isGeneral, courseId }) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [sessionPlan, setSessionPlan] = useState('free');
  const [activeDayCard, setActiveDayCard] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [daysArray, setDaysArray] = useState([
    {
      id: '7',
      name: 'Saturday',
    },
    {
      id: '1',
      name: 'Sunday',
    },
    {
      id: '2',
      name: 'Monday',
    },
    {
      id: '3',
      name: 'Tuesday',
    },
    {
      id: '4',
      name: 'Wednesday',
    },
    {
      id: '5',
      name: 'Thursday',
    },
    {
      id: '6',
      name: 'Friday',
    },
  ]);
  const [form] = Form.useForm();
  const [timePickForm] = Form.useForm();

  const [timeSlot, setTimeSlot] = useState();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { currentUser } = useSelector((state) => state?.user);
  const api = useApi();

  const prefixCurrency = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">USD</Option>
        <Option value="EGP">EGP</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    console.log('values', values);
  };

  const onSubmit = () => {
    form.submit();
    const body = new FormData();
    body.append('price_plan', sessionPlan);
    body.append('amount', price ? price : 10);
    body.append('currency', 'usd');
    body.append('duration', '60');
    courseId && body.append('course_id', courseId);

    api.post(`appointment/speciality/create`, body).then((res) => {
      message.success('session Added Successfully');
    });
  };

  const handleSetTimesSlotsList = (arr) => {
    const formatedSlot = arr?.map((interval) => {
      const [startTime, endTime] = interval.split('-');
      const startFormatted = dayjs(startTime, 'HH:mm').format('hh:mm A');
      const endFormatted = dayjs(endTime, 'HH:mm').format('hh:mm A');

      return { startTime: startFormatted, endTime: endFormatted };
    });

    return formatedSlot;
  };

  const handleFetchList = () => {
    api
      .get(
        `appointment/schedule/list?provider_id=${currentUser?.user_id}&language_id=1&is_schedule_timing=1`,
      )
      .then((res) => {
        if (res) {
          const daysList = res?.data?.list?.[0]?.working_hours;
          const daysListFormat = daysArray.map((day) => {
            return {
              id: day?.id,
              name: day?.name,
              times: handleSetTimesSlotsList(
                daysList?.[(day?.name).toLowerCase()],
              ),
            };
          });
          setActiveDayCard(daysListFormat[0]);
          setDaysArray(daysListFormat);
        }
      });
  };

  useEffect(() => {
    handleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertTime = (timeString) => {
    const convertedTime = dayjs(timeString, 'h:mm A').format('HH:mm');
    return convertedTime;
  };

  const handleAddNewSlot = () => {
    if (!activeDayCard) {
      message.error('You Have to pick a Day');
      return;
    }

    setBtnLoading(true);
    const StartTimeFormat = convertTime(timeSlot?.startTimeSlot);
    const endTimeFormat = convertTime(timeSlot?.endTimeSlot);

    const body = new FormData();
    body.append('provider_id', currentUser?.user_id);
    body.append('appointment_type', 1);
    body.append('day', +activeDayCard?.id);
    body.append('working_hours', `${StartTimeFormat}-${endTimeFormat}`);
    // body.append('price_plan', sessionPlan);
    api
      .post('appointment/schedule/create', body)
      .then((res) => {
        setIsModalOpen(false);
        message.success('Slot Added Successfully');
        handleFetchList();
        setBtnLoading(false);
      })
      .catch((error) => {
        setBtnLoading(false);

        message.error('something went wrong');
      });
  };

  const handleStartTimeChange = (value, dateString) => {
    setTimeSlot({ ...timeSlot, startTimeSlot: dateString });
    setStartTime(value);
    if (endTime && value) {
      setEndTime(dayjs(endTime).isBefore(value) ? null : endTime);
    }
  };

  const handleEndTimeChange = (value, dateString) => {
    setEndTime(value);
    setTimeSlot({ ...timeSlot, endTimeSlot: dateString });

    if (startTime && value) {
      setStartTime(dayjs(startTime).isAfter(value) ? null : startTime);
    }
  };

  const disabledHours = () => {
    return startTime ? [...Array(startTime?.$H).keys()] : [];
  };

  const disabledMinutes = (selectedHour) => {
    return startTime && selectedHour === startTime.$H
      ? [...Array(startTime.$m + 15).keys()]
      : [];
  };

  const handleSetTimes24Format = (time) => {
    const startFormatted = dayjs(time, 'hh:mm A').format('HH:mm');

    return startFormatted;
  };

  const handleDeleteSlot = (time, activeDayCard) => {
    const body = new FormData();
    console.log({ day: activeDayCard?.id });
    body.append('provider_id', currentUser?.user_id);
    body.append('appointment_type', 1);
    body.append('day', +activeDayCard?.id);
    body.append(
      'working_hours',
      `${handleSetTimes24Format(time?.startTime)}-${handleSetTimes24Format(
        time?.endTime,
      )}`,
    );

    api.post('appointment/schedule/delete', body).then((res) => {
      message.success('Deleted Successfully');
      handleFetchList();
    });
    // '07:70-09:50'
  };

  return (
    <div className="general-requests">
      <Form
        layout="vertical"
        className="dashboard-form"
        name="general-requests"
        form={form}
        onFinish={onFinish}
        initialValues={{ prefix: 'EGP', plan: 'free' }}
      >
        <div className="approve-one-on-one">
          {!isGeneral && (
            <div>
              <h4>Approve One On One Request</h4>
              <p>
                Now you can accept the requests that suits to you get your money
                or for free.
              </p>
            </div>
          )}

          <Radio.Group
            style={{ textAlign: 'right' }}
            value={isAvailable}
            onChange={(e) => {
              setIsAvailable(e.target.value);
              api.post('appointment/approve/ono/overall/toggle');
            }}
          >
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </div>
        {isAvailable && (
          <>
            <Form.Item name="plan" className="redio-circle-container">
              <Radio.Group
                value={sessionPlan}
                onChange={(e) => setSessionPlan(e.target.value)}
              >
                <Radio value="free">Free</Radio>
                <Radio value="paid">Select the amount</Radio>
              </Radio.Group>
            </Form.Item>
            {sessionPlan !== 'free' && (
              <>
                <div className="amount-provide">
                  <h4>
                    What is the full amount you'd like to provide per hour ?
                  </h4>
                  <Form.Item
                    name="currency"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ]}
                    className="currency-container"
                  >
                    <Input
                      addonBefore={prefixCurrency}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      value={price}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                </div>
              </>
            )}
            <div className="days-container">
              {daysArray?.map((day) => (
                <div
                  onClick={() => setActiveDayCard(day)}
                  className={`day-card ${
                    activeDayCard?.id === day?.id ? 'active' : ''
                  } `}
                >
                  <p>{day?.name}</p>
                </div>
              ))}
            </div>
            <div className="time-slots">
              <p>Time Slots</p>
              <Button onClick={() => setIsModalOpen(true)} type="link">
                <span>+</span> Add new Time
              </Button>
            </div>
            <div className="time-slots-wrapper">
              {activeDayCard?.times?.length ? (
                activeDayCard?.times?.map((time) => (
                  <div className="time-slots-card">
                    <p>
                      {time?.startTime} - {time?.endTime}
                    </p>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: '1',
                            label: (
                              <span
                                onClick={() => {
                                  handleDeleteSlot(time, activeDayCard);
                                }}
                              >
                                Delete
                              </span>
                            ),
                          },
                        ],
                      }}
                      placement="bottomLeft"
                    >
                      <span>...</span>
                    </Dropdown>
                  </div>
                ))
              ) : (
                <p className="empty-slots">There's No Slots</p>
              )}
            </div>
          </>
        )}
      </Form>
      {isAvailable && (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <DashboardButton text="Save" onclick={onSubmit} type="link" />
        </div>
      )}
      <Modal
        centered
        closeIcon={<Closecon />}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className=" "
        width="484px"
      >
        <Form
          layout="vertical"
          className="dashboard-form"
          name="general-requests"
          form={timePickForm}
          onFinish={handleAddNewSlot}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="startTime"
                label="Start Time"
                className="time-for-item"
                rules={[{ required: true }]}
              >
                <TimePicker
                  value={startTime}
                  format="hh:mm A"
                  onChange={handleStartTimeChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endTime"
                label="End Time"
                className="time-for-item"
                rules={[{ required: true }]}
              >
                <TimePicker
                  value={endTime}
                  format="hh:mm A"
                  onChange={handleEndTimeChange}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button
                loading={btnLoading}
                type="primary"
                className="antd-main-btn"
                htmlType="submit"
              >
                Add
              </Button>
            </Col>
            <Col span={6}>
              <Button
                className="antd-main-btn"
                block={true}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default GeneralRequests;

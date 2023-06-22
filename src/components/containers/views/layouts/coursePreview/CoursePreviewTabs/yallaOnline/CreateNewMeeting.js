import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Checkbox,
  Button,
  Upload,
  message,
  InputNumber,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SmlButton from '../../../../../../../helpers/Buttons/SmlButton';
import { useState } from 'react';
import { protectAxios } from '../../../../../../../apis/coursesAPI';
import { useCreateMeeting } from './hooks/useZoom';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const CreateNewMeeting = ({ handleClose, onChange }) => {
  const params = useParams();

  const showCourse = useSelector((state) => state.singleCourse.singleCourse);

  const getCourseIdFromSlug = (slug) => {
    if (showCourse?.course?.slug == slug) {
      return showCourse?.course.id;
    }
  };
  const courseId = getCourseIdFromSlug(params.course_id);

  const onSuccsses = () => {
    message.success('The Meeting is Succesfully Created!!');
    handleClose();
    onChange(1);
  };
  const onFail = (err) => {};

  const { mutate, isLoading } = useCreateMeeting(onSuccsses, onFail);

  const onFinish = async (values) => {
    console.log(
      {
        ...values,
        host: 'zoom',
        course: courseId,
        lang_id: 19,
        type: 0,
        // start_date: dayjs(values.start_date).format("MM/DD/YYYY"),
        end_date: dayjs(values.start_date).format('MM/DD/YYYY'),
        assign_student: 3, //NOTE:ask ahmed
        fees: 0,
        time: dayjs(values.time).format('hh:mm a'),
        start_date: dayjs(values.start_date).format('MM/DD/YYYY'),
        scope: 1,
        required_type: 1,
        date: dayjs(values.start_date).format('MM/DD/YYYY'),
        host: 'Zoom',
        is_recurring: 0,
        recurring_type: 2,
        recurring_repect_day: 2,
        recurring_end_date: new Date(),
        attendee_password: values.password,
        moderator_password: values.password,
        jitsi_meeting_id: Math.floor(
          100000000000 + Math.random() * 900000000000,
        ),
      },
      'values',
    );
    mutate({
      ...values,
      host: 'zoom',
      course: courseId,
      lang_id: 19,
      type: 0,
      // start_date: dayjs(values.start_date).format("MM/DD/YYYY"),
      end_date: dayjs(values.start_date).format('MM/DD/YYYY'),
      assign_student: 3, //NOTE:ask ahmed
      fees: 0,
      time: dayjs(values.time).format('hh:mm a'),
      start_date: dayjs(values.start_date).format('MM/DD/YYYY'),
      scope: 1,
      required_type: 1,
      date: dayjs(values.start_date).format('MM/DD/YYYY'),
      host: 'Zoom',
      is_recurring: 0,
      recurring_type: 2,
      recurring_repect_day: 2,
      recurring_end_date: new Date(),
      attendee_password: values.password,
      moderator_password: values.password,
      jitsi_meeting_id: Math.floor(100000000000 + Math.random() * 900000000000),
    });
  };

  const onFinishFailed = (errorInfo) => {
    const creatMeeting = document.getElementById('form_Meeting');
    const formData = new FormData(creatMeeting);
  };
  const { Option } = Select;

  return (
    <Form
      name="new-meeting"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      id="form_Meeting"
    >
      <Row gutter={26}>
        <Col span={24}>
          <Form.Item
            className="full-width"
            label="Meeting Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your Meeting title !',
              },
            ]}
          >
            <Input placeholder="Your Meeting Title.." />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={26}>
        <Col span={12} className="gutter-row">
          <label className="ant-form-item-required">Date</label>

          <Form.Item
            name="start_date"
            rules={[
              {
                required: true,
                message: 'Please select a date',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12} className="gutter-row">
          <label className="ant-form-item-required">Time</label>

          <Form.Item
            name="time"
            rules={[
              {
                required: true,
                message: 'Please select a time',
              },
            ]}
          >
            <DatePicker
              picker="time"
              use12Hours={true}
              showTime={{ format: 'HH:mm' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={26}>
        <Col span={24} className="ant-form-item-label pb-0"></Col>
        <Col span={12}>
          <label className="ant-form-item-required">Duration</label>

          <Form.Item
            name="duration"
            rules={[
              {
                required: true,
                message: 'Please Enter session duration in Mins',
              },
            ]}
          >
            <InputNumber
              min={1}
              max={1000}
              // defaultValue={3}
              placeholder={'Duration in mins'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <label className="ant-form-item-required">Time Zone</label>

          <Form.Item
            name="timezone"
            rules={[
              {
                required: true,
                message: 'Please select duration in minutes',
              },
            ]}
          >
            <Select defaultValue="Timezone.." className="w-100" allowClear>
              <Option value="Cairo">(GMT+02:00) Cairo</Option>
              <Option value="Dubai">(GMT+04:00) Dubai</Option>
              <Option value="Greenwich">(GMT+00:00) Greenwich</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={26}>
        <Col span={24}>
          <label className="ant-form-item-required">Description</label>
          <Form.Item name="description">
            <TextArea rows={1} showCount maxLength={40} />
          </Form.Item>
        </Col>
      </Row>
      {/* 
      <Row gutter={26} style={{ marginTop: "2rem" }}>
        <Col span={24}>
          <Form.Item name="image">
            <Input.Group compact>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={1}
              >
                <Button size="large">Upload Photo</Button>
              </Upload>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row> */}

      <Row gutter={26}>
        <Col span={24}>
          <Col span={24} className="ant-form-item-label pb-0">
            <label className="ant-form-item-required">Meeting Password</label>
          </Col>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter the meeting password',
              },
              {
                min: 6,
                message: 'password must be 6 letters at least',
              },
            ]}
          >
            <Input type="password" placeholder="type meeting Password" />
          </Form.Item>
        </Col>
      </Row>

      <div className="text-end  mt-4 mb-3">
        <Button
          className="modalSubmit btn newMeeting"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          create new meeting
        </Button>
      </div>
    </Form>
  );
};

export default CreateNewMeeting;

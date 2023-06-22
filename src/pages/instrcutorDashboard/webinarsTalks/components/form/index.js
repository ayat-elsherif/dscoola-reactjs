import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Upload,
  Progress,
  message,
  TimePicker,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import DraftTextEditor from '../../../../../components/containers/views/layouts/coursePreview/CoursePreviewTabs/questionAndAnswers/DraftTextEditor';
import { BackArrowIcon, DownArrowIcon } from '../../../../../assets/svg';
import useApi from 'Hooks/network/useApi';
import { useUpload } from '../../../courses/components/createCourse/steps/courseDetails/hooks/useUploade';
import dayjs from 'dayjs';

const { Option } = Select;

const WebinarForm = () => {
  const api = useApi();
  const [fileType, setFileType] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategries] = useState();
  const [subcategories, setSubCategries] = useState();
  const [freePlan, setFreePlan] = useState(false);
  const [describtion, setDescribtion] = useState('');
  const [ProgressPar, setProgressPercentage] = useState(-1);
  const [imageId, setImageId] = useState(null);
  const [imageView, setImageView] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccess = () => {
    message.success('Message Uploaded Successfully');
  };

  const onError = (data) => {
    message.error('something went wrong!');
  };

  const { upload, percentageValue, fileData, uploadKeyHook } = useUpload(
    onSuccess,
    onError,
  );

  const handleGetCategories = () => {
    api.get(`categories/parent`).then((res) => {
      setCategries(res?.data);
    });
  };

  const uploadSampleFile = (file) => {
    setFileType(file.type);
    upload(file);
  };

  useEffect(() => {
    if (fileType?.includes('image')) {
      setProgressPercentage(percentageValue);
      if (fileData) {
        setImageId(fileData.key);
        setImageView(fileData.Location);
      }
    }
  }, [percentageValue, fileType, fileData, uploadKeyHook]);

  const handleGetSubCategories = (id) => {
    api
      .get(`categories/${id}/children?perpage=8&order_by=id,asc`)
      .then((res) => {
        console.log({ res });
        setSubCategries(res?.data);
      });
  };

  useEffect(() => {
    handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    setBtnLoading(true);
    const payload = new FormData();
    let duration = values?.duration;
    const durationTest = values?.duration?.split(':');

    console.log('durationTest[0]?.length', durationTest[0]?.length);
    if (durationTest[0]?.length === 1) duration = `0${values?.duration}`;

    payload.append('title', values?.title);
    payload.append('duration', duration);
    payload.append('parent_category_id', values?.category);
    payload.append('second_category_id', values?.sub_catergory);
    payload.append('short_description', describtion);
    payload.append('type', 0);
    payload.append('objective', describtion);
    payload.append('password', values?.password);
    payload.append('host', 'Zoom');
    payload.append('time', dayjs(values?.time).format('hh:mm A'));
    payload.append('price_plan', freePlan ? 'free' : 'paid');
    payload.append('price', values?.Price);
    payload.append('image', imageId);
    payload.append('thumbnail_id', imageId);
    // payload.append(
    //   'end_date',
    //   dayjs(values?.end_date).format('YYYY-MM-DD hh:mm:ss'),
    // );
    payload.append('fees', values?.Price);
    payload.append(
      'start_date',
      dayjs(values?.start_date).format('YYYY-MM-DD hh:mm:ss'),
    );
    payload.append(
      'date',
      dayjs(values?.start_date).format('YYYY-MM-DD hh:mm:ss'),
    );
    payload.append('lang_id', 19);
    payload.append('status', 1);
    payload.append('total_webinar', 45);

    api
      .post('webinar/store', payload)
      .then((res) => {
        setBtnLoading(false);
        form.resetFields();
        setDescribtion('');
        setImageId(null);
        setImageView(null);
        setProgressPercentage(-1);
        message.success('Webinar Created successfully');
        navigate(-1);
      })
      .catch(() => {
        message.error('something went wrong');
        setBtnLoading(false);
      });
  };

  const disabledDate = (current, endDate) => {
    return (
      current &&
      current <
        (endDate
          ? dayjs(startDate).add(1, 'days')
          : dayjs(endDate ? startDate : undefined).subtract(1, 'days'))
    );
  };

  return (
    <div className="webinars-talks-form">
      <div className="header">
        <div className="title">Add New Meeting</div>
        <div className="back" onClick={() => navigate(-1)}>
          <BackArrowIcon /> Back
        </div>
      </div>
      <Form
        layout="vertical"
        className="dashboard-form"
        name="course-requests"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={30}>
          <Col xs={24} lg={12}>
            <div className="webinaaers-card">
              <Form.Item
                name="title"
                label="Meeting Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Meeting Name" />
              </Form.Item>

              <Form.Item
                label="Duration (HH:MM)"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Wibinar Duration!',
                  },
                  {
                    type: 'string',
                    pattern: /^([0-9]?[0-9]|2[0-9]):[0-5][0-9]$/,
                    message: 'Must match the format 01:30',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item name='category' label='Category'>
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  placeholder='select Category'
                >
                  {['Graphic Design', 'Graphic Design2', 'Graphic Design3'].map(
                    (Category) => {
                      return (
                        <Option value={Category} key={Category}>
                          {Category}
                        </Option>
                      );
                    }
                  )}
                </Select>
              </Form.Item> */}
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Please select category!!',
                  },
                ]}
              >
                <Select
                  placeholder="Category"
                  onChange={handleGetSubCategories}
                  options={categories?.map((item) => {
                    return {
                      label: item?.category_name,
                      value: item?.id,
                    };
                  })}
                  on
                />
              </Form.Item>
              <Form.Item
                name="sub_catergory"
                label="Sub Catergory"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  placeholder="select Sub Catergory"
                >
                  {subcategories?.map((subcat) => {
                    return (
                      <Option value={subcat?.id} key={subcat?.id}>
                        {subcat?.category_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="language"
                label="Language"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  placeholder="select Language"
                >
                  {['English'].map((Category) => {
                    return (
                      <Option value={Category} key={Category}>
                        {Category}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <div className="text-editor">
                <h4>About Meeting</h4>
                <DraftTextEditor callBack={setDescribtion} />
              </div>
              <div className="drag-file-container">
                <h4>Image</h4>
                {/* <div className="drag-file">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <UploadIcon />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Click or drag file to this area to upload</p>
                    )}
                  </div>
                </div> */}
                {imageView ? (
                  <img
                    alt="course"
                    src={imageView}
                    className="webinar-upload-image"
                  />
                ) : null}
                {(ProgressPar === 100 || ProgressPar === -1) && (
                  <Upload
                    showUploadList={false}
                    name="image"
                    accept="image/x-png,image/gif,image/jpeg,image/*"
                    customRequest={(file) => uploadSampleFile(file.file)}
                  >
                    <div className="webinar-img-placeholder">
                      <p>Drag & Drop Here Start Uploading.</p>

                      <span>OR</span>
                      <Button type="primary">Browse Here</Button>
                    </div>
                  </Upload>
                )}
                {ProgressPar >= 0 && (
                  <Progress percent={ProgressPar} size="small" />
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="webinaaers-card">
              <Form.Item name="Type" label="Type" rules={[{ required: true }]}>
                <Select
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  placeholder="select Type"
                >
                  <Option value={0}>Single Meeting</Option>
                </Select>
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="start_date"
                    label="Start Date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      onChange={(_, dateString) => setStartDate(dateString)}
                      disabledDate={disabledDate}
                      placeholder="select Date"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="time"
                    label="Start Time"
                    rules={[{ required: true }]}
                  >
                    <TimePicker className="time-picker-lec" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="Host"
                label="Host"
                className="redio-circle-container"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="1">Zoom Meeting</Radio>
                  {/* <Radio value="2">Bigblue Button</Radio>
                  <Radio value="3">Jitsi</Radio> */}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="password"
                label="Password *"
                rules={[
                  {
                    required: true,
                  },
                  { min: 6, message: 'Password must be atleast 6 characters' },
                ]}
              >
                <Input placeholder="Enter password" />
              </Form.Item>
              {/* <Form.Item
                name="Recurring"
                label="Recurring"
                className="redio-circle-container two-redio"
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item> */}
              <Form.Item
                label="This class is free"
                name="free"
                className="switch-inline"
              >
                <Switch
                  onChange={(value) => {
                    setFreePlan(value);
                  }}
                />
              </Form.Item>
              {!freePlan && (
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      name="Currency"
                      label="Currency"
                      rules={[{ required: true }]}
                    >
                      <Select
                        allowClear={false}
                        suffixIcon={<DownArrowIcon />}
                        placeholder="select Currency"
                      >
                        {['USD'].map((currency) => {
                          return (
                            <Option value={currency} key={currency}>
                              {currency}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      name="Price"
                      label="Price"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        placeholder="enter a Price"
                        style={{ width: '100%' }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="salePrice"
                      label="Sale Price"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        placeholder="enter a Sale Price"
                        style={{ width: '100%' }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Form>

      <Form.Item
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Button
          loading={btnLoading}
          onClick={() => {
            form.submit();
          }}
          type="primary"
        >
          Save
        </Button>
      </Form.Item>
    </div>
  );
};

export default WebinarForm;

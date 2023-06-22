import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import { Option } from 'antd/lib/mentions';
import fetch from '../../../../../../../auth/AuthInterceptor';
import React, { useState } from 'react';
import StepHeader from '../components/stepHeader';
import './index.scss';
import './index.scss';
import { useEffect } from 'react';
import Loading from '../../../../../../../components/common/dashboard/shared-components/Loading';
import { DeleteIcon } from '../../../../../../../assets/svg';
import { useQueryClient } from '@tanstack/react-query';
import useInstractorList from 'api-hooks/instractor/useInstractorList';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { queryKeys } from 'services/react-query/queryKeys';
import DeleteModal from 'pages/dashboard/myProfile/components/workExperiences/deleteModal';
import { useSelector } from 'react-redux';

const CourseSetting = () => {
  const [approve_ono, setapprove_ono] = useState(0);
  const [pricePlane, SetPricePlane] = useState();
  const [allow_comment, setAllow_comment] = useState();
  const [allow_notification, setAllow_notification] = useState();
  const [loading, setLoading] = useState(false);
  const [onFinishloading, setonFinishloading] = useState(false);
  const queryClient = useQueryClient();
  const [instractorVal, setInstractorVal] = useState('');
  const [assistantInstructors, setAssistantInstructors] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state?.user);

  const { instractorList, instractorListLod } =
    useInstractorList(instractorVal);
  const onOneChanged = (e) => {
    setapprove_ono(e.target.value);
  };
  const onPricePlaneChange = (e) => {
    SetPricePlane(e.target.value);
  };

  const onFinish = (values) => {
    console.log(approve_ono, 'approve_onoapprove_onoapprove_onoapprove_ono');
    setonFinishloading(true);
    const data = {};
    data.approve_ono = approve_ono;
    data.ono_plan = pricePlane === 0 ? 'free' : 'paid';
    data.ono_price = values.ono_price || null;
    data.ono_sale_price = values.ono_sale_price || null;
    data.allow_comments = allow_comment ? 1 : 0;
    data.allow_notification = allow_notification ? 1 : 0;
    // console.log(data, 'datadatadata');
    // return false;
    fetch({
      url: `api/lecture/course/${localStorage.getItem(
        'live-course-id',
      )}/setting`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
      data,
    })
      .then((res) => {
        setonFinishloading(false);
        //
        // message.success("add successfully!")
        // navigate('/instructor-dashboard/courses/add/goals')
      })
      .catch((e) => {
        setonFinishloading(false);
      });
    // assistantInstructors?.length &&
    fetch({
      url: `api/lecture/course/${localStorage.getItem(
        'live-course-id',
      )}/setting/assistant/permission`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
      data: { assistants: assistantInstructors },
    })
      .then((res) => {
        setonFinishloading(false);

        message.success('add successfully!');
        // navigate('/instructor-dashboard/courses/add/goals')
      })
      .catch((e) => {
        setonFinishloading(false);
      });

    //api/lecture/course/2/setting/assistant/permission
  };

  useEffect(() => {
    setLoading(true);
    fetch({
      url: `api/lecture/course/${localStorage.getItem(
        'live-course-id',
      )}/setting`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        console.log(res, 'csseve');
        form.setFieldsValue({
          allow_comments: res?.data?.allow_comments,
          // allow_notification: res?.data?.allow_notification,
          approve_ono: res?.data?.approve_ono ? 1 : 0,
          ono_plan: res?.data?.ono_plan == 'free' ? 0 : 1,
          ono_price: res?.data?.ono_price,
          ono_sale_price: res?.data?.ono_sale_price,
        });
        setapprove_ono(res?.data?.approve_ono ? 1 : 0);
        setAllow_notification(res?.data?.allow_notification ? 1 : 0);
        setAllow_comment(res?.data?.allow_comments ? 1 : 0);
        SetPricePlane(res?.data?.ono_plan == 'free' ? 0 : 1);
      })
      .catch((e) => {
        setLoading(false);
      });
    fetch({
      url: `api/lecture/course/${localStorage.getItem(
        'live-course-id',
      )}/setting/assistant/permission`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setAssistantInstructors(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const onSearch = (value) => {
    setInstractorVal(value);
    // queryClient.invalidateQueries([queryKeys.instractorList, value]);
  };
  const handleDelete = () => {
    const id = openDeleteModal;
    const newassistantInstructors = assistantInstructors?.filter(
      (s) => +s?.assistant_id !== +id,
    );
    setAssistantInstructors(newassistantInstructors);
    setOpenDeleteModal(false);
  };

  const handelChangePermissions = (index, key, value) => {
    const newAssistantInstructors = [...assistantInstructors];
    newAssistantInstructors[index].permissions = {
      ...newAssistantInstructors[index].permissions,
      [key]: value,
    };
    setAssistantInstructors(newAssistantInstructors);
  };

  return (
    <div className="course-settings">
      <StepHeader data={{ title: 'Course Settings', preview: true }} />
      <DeleteModal
        open={!!openDeleteModal}
        header="Are You sure?"
        body="You Want To Delete This Instructor ?"
        handleCancel={() => setOpenDeleteModal(false)}
        loading={loading}
        handleDelete={() => {
          handleDelete();
        }}
      />
      <Form onFinish={onFinish} form={form} layout="vertical">
        {loading ? (
          <Loading />
        ) : (
          <div className="course-settings_body">
            <Row justify="space-between">
              <Col className="header">Approve One On One Request</Col>
              <Col>
                <Form.Item>
                  <Radio.Group
                    onChange={onOneChanged}
                    value={approve_ono}
                    buttonStyle="solid"
                  >
                    <Radio.Button value={1}>yes</Radio.Button>
                    <Radio.Button value={0}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="ono_plan">
              <Radio.Group
                className="pricing-radio"
                onChange={onPricePlaneChange}
                value={pricePlane}
              >
                <Space direction="vertical">
                  <Radio value={0}>Free</Radio>
                  <Radio value={1}>Select the amount</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            {pricePlane ? (
              <>
                <Form.Item
                  name="ono_price"
                  label=" What is the full amount you'd like to provide per hour ?"
                >
                  <InputNumber
                    size="large"
                    placeholder="Enter Price"
                    style={{
                      width: '50%',
                    }}
                  />
                </Form.Item>

                <Form.Item name="ono_sale_price" label=" Sale Price ?">
                  <InputNumber
                    size="large"
                    placeholder="Enter Sale Price"
                    style={{
                      width: '50%',
                    }}
                  />
                </Form.Item>
              </>
            ) : null}

            <Form.Item
              label="Course Notification"
              name="allow_notification"
              style={{ marginBottom: '5px' }}
            >
              <Checkbox
                className="check-padd"
                // defaultChecked={true}
                onChange={(e) => {
                  setAllow_comment(e.target.checked);
                }}
              >
                Allow students to ask and answer any question in your course
              </Checkbox>
            </Form.Item>

            <Form.Item name="allow_comments">
              <Checkbox
                className="check-padd2"
                // defaultChecked={true}
                onChange={(e) => {
                  setAllow_notification(e.target.checked ? 1 : 0);
                }}
              >
                Allow notifications on new enrollment on this course
              </Checkbox>
            </Form.Item>

            <div className="header">Instructor Permissions</div>
            {assistantInstructors.length > 0 ? (
              <div className="check-container">
                <Row className="check-row1">
                  <Col className="check-col1" span={7}>
                    Instructors Name
                  </Col>
                  <Col className="check-col1" span={3}>
                    Visible
                  </Col>
                  <Col className="check-col1" span={3}>
                    Manage
                  </Col>
                  <Col className="check-col1" span={3}>
                    Q&A
                  </Col>
                  <Col className="check-col1" span={3}>
                    Quiz
                  </Col>
                  <Col span={3} className="check-col1">
                    One-on-One
                  </Col>
                  <Col span={1} className="check-col1"></Col>
                </Row>
                <Divider className="divider-margin"></Divider>
                {assistantInstructors.map((item, index) => {
                  return (
                    <Row key={index} className="check-row2">
                      <Col span={7}>
                        {/* <img src={item?.assistant_photo} alt="" /> */}
                        {item?.assistant_photo ? (
                          <Avatar src={item?.assistant_photo} />
                        ) : (
                          <Avatar icon={<UserOutlined />} />
                        )}
                        <span className="name">{item?.assistant_name}</span>
                      </Col>
                      <Col className="check-col-pad" span={3}>
                        <Form.Item>
                          <Checkbox
                            checked={item?.permissions?.visible}
                            onChange={(e) =>
                              handelChangePermissions(
                                index,
                                'visible',
                                e.target.checked ? 1 : 0,
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col className="check-col-pad" span={3}>
                        <Checkbox
                          checked={item?.permissions?.manage}
                          onChange={(e) =>
                            handelChangePermissions(
                              index,
                              'manage',
                              e.target.checked ? 1 : 0,
                            )
                          }
                        />
                      </Col>
                      <Col className="check-col-pad" span={3}>
                        {' '}
                        <Checkbox
                          checked={item?.permissions?.qa}
                          onChange={(e) =>
                            handelChangePermissions(
                              index,
                              'qa',
                              e.target.checked ? 1 : 0,
                            )
                          }
                        />
                      </Col>
                      <Col className="check-col-pad" span={3}>
                        {' '}
                        <Checkbox
                          checked={item?.permissions?.quiz}
                          onChange={(e) =>
                            handelChangePermissions(
                              index,
                              'quiz',
                              e.target.checked ? 1 : 0,
                            )
                          }
                        />
                      </Col>
                      <Col className="check-col-pad" span={3}>
                        {' '}
                        <Checkbox
                          checked={item?.permissions?.ono}
                          onChange={(e) =>
                            handelChangePermissions(
                              index,
                              'ono',
                              e.target.checked ? 1 : 0,
                            )
                          }
                        />
                      </Col>
                      <Col className="check-col1 delete-col" span={1}>
                        <DeleteIcon
                          onClick={() => setOpenDeleteModal(item?.assistant_id)}
                          className="delete-icon"
                        />
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : null}

            <Input.Group compact>
              <Select
                showSearch
                placeholder="Enter an Email to add to Scoola"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{
                  width: 'calc(100% - 100px)',
                  marginBottom: '80px',
                }}
                loading={instractorListLod}
                onSelect={(id, option) => {
                  if (
                    assistantInstructors?.some((s) => +s?.assistant_id === +id)
                  )
                    return message.error('instructor added before in list');
                  setAssistantInstructors([
                    ...assistantInstructors,
                    {
                      assistant_id: option?.data?.id,
                      assistant_photo: option?.data?.avatar,
                      assistant_name: option?.data?.name,
                      permissions: {
                        manage: 0,
                        visible: 0,
                        qa: 0,
                        ono: 0,
                        quiz: 0,
                      },
                    },
                  ]);
                }}
                onSearch={onSearch}
              >
                {/* {instractorListLod && <LoadingOutlined />} */}
                {instractorList
                  ?.filter((ele) => ele?.id !== currentUser?.user_id)
                  ?.map((ele) => (
                    <Option
                      value={ele?.id}
                      key={ele?.id}
                      label={ele.email}
                      data={ele}
                    >
                      <div className="instractur-row-holder">
                        <Avatar src={ele?.avatar} />
                        <p className="instractur--name">{ele?.name}</p>
                      </div>
                    </Option>
                  ))}
              </Select>

              {/* <Button
                className="btn-add-instructor"
                // disabled={
                //   assistantInstructorInfo
                //     ? Object.keys(assistantInstructorInfo)?.length < 1
                //     : false
                // }
                onClick={onAddAssistantInstructor}
              >
                Add
              </Button> */}
            </Input.Group>

            <Row justify="end">
              <Col>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={onFinishloading}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Form>
    </div>
  );
};

export default CourseSetting;

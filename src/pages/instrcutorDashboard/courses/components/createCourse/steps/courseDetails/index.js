import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Upload,
  message,
  Progress,
  Button,
  Tooltip,
  Skeleton,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  ActivePlusIcon,
  AddIconExp,
  DownArrowIcon,
  InfoIcon,
  UploadCerIcon,
  VideoPlaceholderIcon,
} from '../../../../../../../assets/svg';
import DashboardButton from '../../../../../../../components/common/dashboard/components/button';
import DraftTextEditor from '../../../../../../../components/containers/views/layouts/coursePreview/CoursePreviewTabs/questionAndAnswers/DraftTextEditor';
import StepHeader from '../components/stepHeader';
import './index.scss';
import { useUpload } from './hooks/useUploade';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { normalizeDataToFields } from '../../../../../../dashboard/myProfile/components/personalInformation/Helpers';
import Loading from '../../../../../../../components/common/dashboard/shared-components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../../../../../../network/useApi';
import Bundel from './bundel';
import ReturnedBundels from './returnedBundels';
import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';
import WarningMessage from 'helpers/warningMesages';
import { useSelector } from 'react-redux';

window.Buffer = window.Buffer || require('buffer').Buffer;
// const S3_BUCKET = 'https://s3.us-east-1.amazonaws.com/descola-front/';
const { Option } = Select;

const CourseDetails = () => {
  const [form] = Form.useForm();
  const api = useApi();
  const queryClient = useQueryClient();
  const [fields, setFields] = useState([]);
  const [fileType, setFileType] = useState();
  const [ProgressPar, setProgressPercentage] = useState(-1);
  const [videoProgressPar, setVideoProgressPercentage] = useState(-1);
  const [Categories, setCategories] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [fetchedDataLoading, setFetchedDataLoading] = useState(false);
  const [childCategory, setChildCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  const [videoErr, setVideoErr] = useState(false);
  const [courseDetailesData, setCourseDetailesData] = useState({});

  const [imageErr, setImageErr] = useState(false);
  const [onFinishLoading, setonFinishLoading] = useState(false);
  const [courseType, setCourseType] = useState('');

  const [uploadKey, setUploadKey] = useState('');
  const [onFinishErrors, setOnFinishErrors] = useState(null);
  const [description, setDescription] = useState(
    courseDetailesData?.description,
  );
  const [imageView, setImageView] = useState(null);
  const [openBunderForm, setOpenBunderForm] = useState(false);

  const [descriptionErr, setDescriptionErr] = useState(false);
  const [videoView, setVideoView] = useState(null);
  const navigate = useNavigate();
  const courseId = localStorage.getItem('live-course-id');
  var categoriesArr = [];
  var subCategoriesArr = [];
  var childCategoriesArr = [];

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

  Categories?.forEach((item) => {
    categoriesArr.push({ label: item.category_name, value: item.id });
  });

  subCategory?.forEach((item) => {
    subCategoriesArr.push({ label: item.category_name, value: item.id });
  });

  childCategory?.forEach((item) => {
    childCategoriesArr.push({ label: item.category_name, value: item.id });
  });

  const onFinish = (values) => {
    values.description = description;
    if (description === null) {
      setDescriptionErr(true);
      message.error('Please Enter Description');
      return;
    }
    if (isHaveBundle) {
      message.error('Please add 1 bunble at least');
      return;
    }
    values.thumbnail_id = imageId;
    values.video_src = {
      video_src: videoId,
      type: 'mp4',
    };
    setonFinishLoading(true);
    api
      .put(
        `lecture/course/${localStorage.getItem(
          'live-course-id',
        )}/setup-details`,
        values,
      )
      .then(() => {
        queryClient.invalidateQueries([`add-course`]);
        setonFinishLoading(false);
        message.success('add successfully!');
        navigate('/instructor-dashboard/courses/add/goals');
      })
      .catch((err) => {
        const errors = Object.entries(err.response.data.errors[0].message);
        setonFinishLoading(false);
        const drawErrors = errors.map((item, index) => (
          <ul key={index}>
            <li>{item[1]}</li>
          </ul>
        ));
        setOnFinishErrors(drawErrors);
      });
  };

  const onSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (fileType?.includes('image')) {
      setProgressPercentage(percentageValue);
      if (fileData) {
        setImageId(fileData.key);
        setImageView(fileData.Location);
      }
    } else if (fileType?.includes('video')) {
      setVideoProgressPercentage(percentageValue);
      if (fileData) {
        setVideoId(fileData.Key);
        setVideoView(fileData.Location);
      }
    }
    if (uploadKeyHook) setUploadKey(uploadKeyHook);
  }, [percentageValue, fileType, fileData, uploadKeyHook]);

  const uploadSampleFile = (file) => {
    setFileType(file.type);
    upload(file);
  };

  const handleChange = (value, e) => {
    setSelectedCategoryId(value);
    form.setFieldsValue({
      second_category_id: null,
      topic_id: null,
    });
  };

  const handleSubCatChange = (value) => {
    setSelectedSubCategoryId(value);
    form.setFieldsValue({
      topic_id: null,
    });
  };

  const onSearch = (value) => {};

  useEffect(() => {
    setFetchedDataLoading(true);
    api
      .get(
        `lecture/course/${localStorage.getItem(
          'live-course-id',
        )}/setup-details `,
      )
      .then((res) => {
        setFetchedDataLoading(false);
        setCourseDetailesData(res.data);
        setVideoView(
          res.data.videoPreviewUrl !== []
            ? res.data.videoPreviewUrl.video_src
            : null,
        );
        setImageView(res.data.thumbnailUrl ? res.data.thumbnailUrl : null);
        setCourseType(res?.data?.type);
        setImageId(res.data.thumbnail_id ? res.data.thumbnail_id : null);
        setVideoId(res.data.video_src ? res.data.video_src.video_src : null);
        setDescription(res.data.description);
        setSelectedCategoryId(res?.data?.parent_category_id);
        setSelectedSubCategoryId(res?.data?.second_category_id);
        form.setFieldsValue({
          parent_category_id: res?.data?.parent_category_id,
          second_category_id: res?.data?.second_category_id,
          short_description: res?.data?.short_description,
          slug: res?.data?.slug,
          title: res?.data?.title,
          topic_id: res?.data?.topic_id,
          type: res?.data?.type,
          thumbnailUrl: res?.data?.thumbnailUrl,
          level: res?.data?.level,
        });
      })
      .catch((err) => {
        setFetchedDataLoading(false);
        message.error('something went wrong');
      });
  }, []);

  const onGetCatSuccess = (categories) => {
    setCategories(categories.data);
  };
  const onGetSubCatSuccess = (subCategories) => {
    setSubCategory(subCategories.data);
  };
  const onGetChildCatSuccess = (ChildCategories) => {
    setChildCategory(ChildCategories.data);
  };
  useQuery(
    [`get-categories`],
    () => {
      return api.get(`categories/parent/filter`);
    },
    {
      onSuccess: onGetCatSuccess,
      onError: onError,
    },
  );
  useQuery(
    [`get-sub-categories`, selectedCategoryId],
    () => {
      return api.get(`categories/${selectedCategoryId}/children`);
    },
    {
      onSuccess: onGetSubCatSuccess,
      onError: onError,
      enabled: !!selectedCategoryId,
    },
  );
  // eslint-disable-next-line no-unused-vars
  const { data: ChildCategories } = useQuery(
    [`get-child-categories`, selectedSubCategoryId],
    () => {
      return api.get(`categories/${selectedSubCategoryId}/children`);
    },
    {
      onSuccess: onGetChildCatSuccess,
      onError: onError,
      enabled: !!selectedSubCategoryId,
    },
  );
  const isLiveOnChange = courseType === 'liveClass';

  const { data: Bundles } = useQuery([`get-bundles`], () => {
    return api.get(
      `lecture/course/${courseId}/setup-details/bundle?order_by=id,asc`,
    );
  });

  const isHaveBundle = Bundles?.data?.length === 0 && isLiveOnChange;
  const zoomWarningMessage = (
    <span>
      Please complete your meeting settings{' '}
      <Link to="/instructor-dashboard/zoom-settings">here</Link> then add your
      bundles
    </span>
  );
  const { currentUser } = useSelector((state) => state?.user);

  return (
    <div className="course-details">
      <StepHeader data={{ title: 'Course Details', preview: true }} />
      {fetchedDataLoading ? (
        <Loading />
      ) : (
        <div className="course-details_body">
          <Form
            layout="vertical"
            className="dashboard-form"
            name="course-details"
            form={form}
            fields={fields}
            initialValues={{}}
            onFinish={onFinish}
          >
            <Row gutter={10} style={{ marginBottom: 20 }}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="title"
                  label="Course title"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Your Title',
                    },
                  ]}
                >
                  <Input placeholder="Please Enter Your Title" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="short_description"
                  label="Course Subtitle"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Your Subtitle',
                    },
                  ]}
                >
                  <Input placeholder="Please Enter Your Subtitle" />
                </Form.Item>
              </Col>
            </Row>
            <div className="custom-text-editor">
              <h4>Course Description</h4>
              {/* <DraftTextEditor
                placeholder="Please Enter Your Description here"
                callBack={setDescription}
              /> */}
              <OwnTextEditor
                textEdit={description}
                setTextEdit={setDescription}
                placeholder="Enter Description"
                isRecordable={false}
                // record={record}
                // setRecord={setRecord}
              />
              {descriptionErr ? (
                <div className="upload-err">please enter description</div>
              ) : null}
            </div>

            <Row gutter={10} className="pt-4">
              <Col xs={24} md={8}>
                <Form.Item
                  name="parent_category_id"
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Select Category',
                    },
                  ]}
                >
                  <Select
                    placeholder="Category"
                    showSearch
                    onSearch={onSearch}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    allowClear={false}
                    suffixIcon={<DownArrowIcon />}
                    onChange={handleChange}
                    options={categoriesArr}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="second_category_id"
                  label="Sub Category"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Select Sub Category',
                    },
                  ]}
                >
                  <Select
                    placeholder="Sub Category"
                    showSearch
                    onSearch={onSearch}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    allowClear={false}
                    suffixIcon={<DownArrowIcon />}
                    onChange={handleSubCatChange}
                    options={subCategoriesArr}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="topic_id"
                  label="Child Category"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Select Child Category',
                    },
                  ]}
                >
                  <Select
                    placeholder="Child Category"
                    showSearch
                    onSearch={onSearch}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    allowClear={false}
                    suffixIcon={<DownArrowIcon />}
                    options={childCategoriesArr}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10} style={{ marginTop: 22 }}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="slug"
                  label="Unique Course Name"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Enter Unique Course Name',
                    },
                  ]}
                >
                  <Input placeholder="Please Enter here" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="level"
                  label="Level"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Enter Course Level',
                    },
                  ]}
                >
                  <Select
                    placeholder="Level"
                    allowClear={false}
                    suffixIcon={<DownArrowIcon />}
                  >
                    <Option value={parseInt(1)}>Beginner</Option>
                    <Option value={parseInt(2)}>Intermediate</Option>
                    <Option value={parseInt(3)}>Advanced</Option>
                    <Option value={parseInt(4)}>Professional</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Plesae Enter Course type',
                    },
                  ]}
                >
                  <Select
                    onChange={(value) => setCourseType(value)}
                    placeholder="Type"
                    allowClear={false}
                    suffixIcon={<DownArrowIcon />}
                  >
                    <Option value="recorded">Recorded</Option>
                    <Option value="liveClass">Live</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {!currentUser.is_zoom_setting_done && isLiveOnChange && (
              <WarningMessage message={zoomWarningMessage} />
            )}

            {currentUser.is_zoom_setting_done && (
              <>
                {' '}
                {!openBunderForm && (
                  <>
                    {' '}
                    {(() => {
                      if (isLiveOnChange) {
                        if (Bundles?.data?.length > 0) {
                          return (
                            <>
                              <ReturnedBundels Bundles={Bundles} />
                              <Button
                                type="link"
                                onClick={() => setOpenBunderForm(true)}
                              >
                                <AddIconExp />
                                Add New Bundle
                              </Button>
                            </>
                          );
                        } else if (Bundles?.data?.length === 0) {
                          return <Bundel />;
                        }
                      }
                    })()}
                  </>
                )}
              </>
            )}

            {openBunderForm && (
              <Bundel
                isclosable={true}
                close={() => setOpenBunderForm(false)}
              />
            )}

            <Row gutter={10} align="middle">
              <Col xs={24} md={10}>
                <div className="photo-container">
                  <h4>Course Image</h4>
                  {false ? (
                    <Skeleton.Image
                      active
                      style={{ width: 309, height: 187 }}
                    />
                  ) : imageView ? (
                    <img
                      alt="course"
                      src={imageView}
                      className="course-upload-image"
                    />
                  ) : (
                    <img
                      alt="Upload"
                      src="/assets/images/placeholder-course.png"
                      className="course-upload-image"
                    />
                  )}
                </div>
              </Col>
              <Col xs={24} md={14}>
                <p>
                  Upload your course image . Important guidelines:
                  <span>
                    750x422 pixels; .jpg, .jpeg, . gif, or .png. no text on the
                    image.
                  </span>
                </p>
                {(ProgressPar === 100 || ProgressPar === -1) && (
                  <Upload
                    showUploadList={false}
                    name="image"
                    accept="image/x-png,image/gif,image/jpeg,image/*"
                    customRequest={(file) => uploadSampleFile(file.file)}
                  >
                    <div class="custom-file-upload">Upload Image</div>
                  </Upload>
                )}

                {ProgressPar >= 0 && (
                  <Progress percent={ProgressPar} size="small" />
                )}

                {imageErr && (
                  <div className="upload-err">not supported type</div>
                )}
              </Col>
            </Row>
            <Row gutter={10} align="middle">
              <Col xs={24} md={10}>
                <div className="vedio-container">
                  <h4>Course Intro Video</h4>

                  {0 < videoProgressPar && videoProgressPar < 100 ? (
                    <Skeleton.Image
                      active
                      style={{ width: 309, height: 187 }}
                    />
                  ) : videoView ? (
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                      src={videoView}
                      className="course-upload-image"
                    ></iframe>
                  ) : (
                    <VideoPlaceholderIcon />
                  )}
                </div>
              </Col>
              <Col xs={24} md={14}>
                <p>
                  Upload your Course Intro Video . Important guidelines:
                  <span>Lorem Ipsum is simply</span>
                </p>
                {(videoProgressPar === 100 || videoProgressPar === -1) && (
                  <Upload
                    showUploadList={false}
                    name="video"
                    accept="video/mp4,video/x-m4v,video/*"
                    fileList={[]}
                    customRequest={(file) => uploadSampleFile(file.file)}
                  >
                    <div class="custom-file-upload">Upload Video</div>
                  </Upload>
                )}

                {videoProgressPar >= 0 && (
                  <Progress percent={videoProgressPar} size="small" />
                )}
                {videoErr && <div className="upload-err">not supported</div>}
              </Col>
            </Row>
            {/* {onFinishErrors ? (
              <div className="total-errors">{onFinishErrors}</div>
            ) : null} */}

            <div className="action-container">
              <DashboardButton
                text="Next Step"
                onclick={onSubmit}
                type="link"
                disabled={
                  (imageId === null || videoId === null) &&
                  (ProgressPar !== 100 || videoProgressPar !== 100)
                }
                loading={onFinishLoading}
                cssStyle={{ height: '41px', width: '120px' }}
              />
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

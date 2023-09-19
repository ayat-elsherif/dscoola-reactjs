import { useEffect, useState } from 'react';
import { Button, Collapse, Dropdown, message, Space } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useApi from 'Hooks/network/useApi';
import {
  liveSessionIcon,
  sessionDateIcon,
  sessionTimeIcon,
  CheckedIcon,
  emptyCircleIcon,
} from '../SVGs';
import _ from 'lodash';
import { loadedLecInfo } from '../../../features/coursePreview/coursePreview';
import '../style.scss';
import { courseContentState } from 'features/courseContent/courseContentState';
import { DownloadOutlined } from '@ant-design/icons';

const Coursecontent = ({ showProgress }) => {
  let { lecture_id, section_id, course_id } = useParams();
  const api = useApi();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  let [contentSections, setContentSections] = useState([]);
  console.log('Coursecontent  contentSections:', contentSections);

  let lectures = [];
  let [openNestedPanels, setOpenNestedPanels] = useState([]);
  let [openPanels, setOpenPanels] = useState([]);
  // const [lecDescriptionExpand, setLecDescriptionExpand] = useState(false);
  const { Panel } = Collapse;
  const myCourse = useSelector((state) => state.singleCourse?.singleCourse);
  console.log('Coursecontent  myCourse:', myCourse);

  const handleFetchCourseSection = () => {
    api
      .get(`lecture/section/${course_id}`)
      .then((res) => {
        // setLecture(res?.data);
        setLoading(false);
      })
      .catch(() => {});
  };

  const handleFetchCourseContent = () => {
    api
      .get(`lecture/course/${course_id}/content`)
      .then((res) => {
        setContentSections(res?.data);
        dispatch(courseContentState(res.data));

        setLoading(false);
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  };

  useEffect(() => {
    if (!course_id) return;
    handleFetchCourseSection();
    handleFetchCourseContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCourse?.course, course_id]);

  useEffect(() => {
    if (!lecture_id && !section_id) return;
    setOpenPanels([section_id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lecture_id, section_id]);

  myCourse?.course_chapter?.map((item) => {
    lectures = [...lectures, item.classes.length];

    let lecturesSNum = _.sum(lectures);
    return lecturesSNum;
  });
  const onLectureChange = (sectionLecture) => {
    if (sectionLecture?.type === 'video') {
      dispatch(loadedLecInfo(sectionLecture?.items?.video));
    }
  };

  const handleFetchDuration = (duration) => {
    if (!duration) return `0h 0m `;

    const parts = duration?.split(':');
    const durationHours = isNaN(parts?.[0]) ? parts?.[0] : parseInt(parts?.[0]);
    const durationMins = isNaN(parts?.[1]) ? parts?.[1] : parseInt(parts?.[1]);

    return `${durationHours}h ${durationMins}m `;
  };

  const handleGetLEcType = (type) => {
    switch (type) {
      case 'video':
        return <img src="/assets/images/icons/Group 3402 (1).svg" alt="" />;
      case 'livesession':
        return liveSessionIcon;
      case 'artical':
        return <img src="/assets/images/icons/artcle-icon.png" alt="" />;
      case 'quiz':
        return <img src="/assets/images/icons/Mask Group 456 (1).svg" alt="" />;
      case 'videoslide':
        return <img src="/assets/images/icons/artcle-icon.png" alt="" />;
      default:
        return <img src="/assets/images/icons/Group 3402 (1).svg" alt="" />;
    }
  };
 
  const handleLecturesList = (myCourse, sectionLecture, section) => {
    const lectureType = sectionLecture?.type;

    switch (lectureType) {
      case 'livesession':
        const startTime = Date.parse(
          sectionLecture?.items?.zoomMeeting?.start_time,
        );
        const endTime = Date.parse(
          sectionLecture?.items?.zoomMeeting?.end_time,
        );
         
        const topic = sectionLecture?.items?.zoomMeeting?.topic;
        
        const now = new Date();
        if (!endTime || !startTime) {
          <Link
            onClick={() => {
              onLectureChange(sectionLecture);
            }}
            to={`/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${section?.id}/preview/${sectionLecture?.id}`}
            className="course-content-list-item-expand-span-enrolled"
          >
            {sectionLecture?.title}

          
          </Link>;
        }

        if (startTime <= Date.parse(now) && Date.parse(now) <= endTime) {
          return (
            <Link
              to={`/course/${myCourse?.course?.slug}/section/${section?.id}/preview/${sectionLecture?.id}`}
              className="course-content-list-item-expand-span-enrolled"
            >
              {topic}
               
              <span className="meeting-status now">
                <strong className="ms-2">Now</strong>
              </span>
            </Link>
          );
        } else {
          const meetingPassed = Date.parse(now) > endTime;
          const status = meetingPassed ? 'Passed' : 'Upcoming';

          return (
            <span
              className="course-content-list-item-expand-span-enrolled"
              style={{ cursor: 'auto' }}
            >
              {topic}
              <strong className="ms-2">
                <span
                  className={`meeting-status ${
                    meetingPassed ? 'expired' : 'now'
                  }`}
                >
                  {sectionLecture?.title} ({status})
                </span>
              </strong>
            </span>
          );
        }
      case 'video':
        const title = sectionLecture?.items?.video?.title;
        return (
          <Link
            onClick={() => {
              onLectureChange(sectionLecture);
            }}
            to={`/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${section?.id}/preview/${sectionLecture?.id}`}
            className="course-content-list-item-expand-span-enrolled"
          >
            {title}
          </Link>
        );
      case 'artical':
        const fileName = sectionLecture?.title;
        return (
          <Link
            onClick={() => {
              onLectureChange(sectionLecture);
            }}
            to={`/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${section?.id}/preview/${sectionLecture?.id}`}
            className="course-content-list-item-expand-span-enrolled"
          >
            {fileName}
          </Link>
        );

      case 'quiz':
        const QuizName = sectionLecture?.title;
        return (
          <Link
            onClick={() => {
              onLectureChange(sectionLecture);
            }}
            to={`/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${section?.id}/preview/${sectionLecture?.id}`}
            className="course-content-list-item-expand-span-enrolled"
          >
            {QuizName}
          </Link>
        );
      case 'videoslide':
        const VideolSlideName = sectionLecture?.title;
        return (
          <Link
            onClick={() => {
              onLectureChange(sectionLecture);
            }}
            to={`/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${section?.id}/preview/${sectionLecture?.id}`}
            className="course-content-list-item-expand-span-enrolled"
          >
            {VideolSlideName}
          </Link>
        );
      default:
        return (
          <p className="course-content-list-item-expand-span-enrolled">
            {sectionLecture?.title || 'Course'}
          </p>
        );
    }
  };

  const handleTextLoading = (text) => {
    const letters = text.split('').map((letter, i) => (
      <span
        key={`loading-letter-${letter}-${i}`}
        style={{ animationDelay: `${i}00ms` }}
      >
        {letter}
      </span>
    ));

    return letters;
  };

  if (loading || !myCourse) return;

  return (
    <div className="course-content-wrapper">
      <div className="course-content-container">
        {!showProgress && (
          <div className="course-content-disc">
            {myCourse?.sections?.length} sections •{' '}
            {myCourse?.course?.total_lectures} lectures •{' '}
            {handleFetchDuration(myCourse?.course?.total_duration)} total length
          </div>
        )}
      </div>
      <Collapse
        className="main-content-collapse"
        activeKey={openPanels}
        onChange={setOpenPanels}
      >
        {contentSections?.sections?.map((item, idx) => {
          return (
            <Panel
              header={
                myCourse?.course?.type === 'liveClass'
                  ? `Week ${idx + 1} - ${item?.section_name}`
                  : item?.section_name
              }
              extra={
                <span>
                  {item?.total_lectures} lec •{' '}
                  {handleFetchDuration(item.total_duration)}
                </span>
              }
              key={item.id}
            >
              <ul className="course-content-list">
                <Collapse
                  activeKey={openNestedPanels}
                  onChange={setOpenNestedPanels}
                  className="course-content-list"
                  expandIcon={() => {
                    return null;
                  }}
                >
                  {item?.lectures?.map((sectionLecture, index) => {
                      
                    return (
                      <Panel
                        className={`course-content-list-item-expand-li course-content-lectures ${
                          +lecture_id === sectionLecture?.id
                            ? 'active-lecture'
                            : ''
                        }`}
                        header={
                          <>
                            {showProgress &&
                            (sectionLecture.is_seen ||
                              sectionLecture?.is_completed)
                              ? CheckedIcon
                              : emptyCircleIcon}
                            {handleGetLEcType(sectionLecture?.type)}
                            <div className="course-content-list-item-container">
                              
                              {myCourse?.course?.isEnrolled.is_enrolled ? (
                                <>
                                  {handleLecturesList(
                                    myCourse,
                                    sectionLecture,
                                    item,
                                  )}
                                </>
                              ) : (
                                <>
                                  <span className="course-content-list-item-expand-span">
                                    {sectionLecture?.type === 'livesession'
                                      ? sectionLecture?.items?.zoomMeeting
                                          ?.topic
                                        ? sectionLecture?.items?.zoomMeeting
                                            ?.topic
                                        : sectionLecture?.title
                                      : sectionLecture?.title}
                                  </span>
                                </>
                              )}
                              {sectionLecture?.text && (
                                <img
                                  className="arrow-down"
                                  src="/assets/images/icons/arrow-down.png"
                                  alt="arrow"
                                />
                              )}
                            </div>
                            {showProgress &&
                            +lecture_id === sectionLecture?.id ? (
                              <div className="current-active-lecture">
                                {handleTextLoading('...')}
                              </div>
                            ) : null}
                          </>
                        }
                        extra={
                          <div className="course-content-list-item-expand-li-time">
                            {sectionLecture?.type === 'livesession' ? (
                              <Space size={8} style={{ fontSize: 11 }}>
                                <Space
                                  size={3}
                                  style={{ fontSize: 11, whiteSpace: 'nowrap' }}
                                >
                                  {sessionDateIcon}
                                  {dayjs(sectionLecture.unlock_date).format(
                                    'MMM DD, YYYY',
                                  )}
                                </Space>
                                |
                                <Space
                                  size={3}
                                  style={{ fontSize: 11, whiteSpace: 'nowrap' }}
                                >
                                  {sectionLecture?.start_time &&
                                  sectionLecture?.end_time ? (
                                    <Space size={3} style={{ fontSize: 11 }}>
                                      {sessionTimeIcon}
                                      {sectionLecture.start_time} -
                                      {sectionLecture.end_time}
                                    </Space>
                                  ) : (
                                    'Time is not setting yet '
                                  )}
                                </Space>
                              </Space>
                            ) : sectionLecture?.type === 'quiz' ? (
                              <p>{sectionLecture?.questions_count} Question</p>
                            ) : (
                              handleFetchDuration(
                                sectionLecture?.total_duration,
                              )
                            )}
                          </div>
                        }
                        key={`${item.id}-${sectionLecture?.id}`}
                      >
                        <div className="extra">
                          {/* https://dscoola-files.s3.eu-west-1.amazonaws.com/lecture.resource/course.video.preview/Jack_Black_01_25_2023.docx */}
                          {/* {sectionLecture?.text} */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sectionLecture?.text,
                            }}
                          />
                          {sectionLecture?.items?.resource &&
                            !!Object.keys(sectionLecture?.items?.resource)
                              .length && (
                              <Dropdown
                                className="resources-dropdown"
                                menu={{
                                  items: [
                                    {
                                      key: 1,
                                      label: (
                                        <a
                                          className="download-resource"
                                          target="_blank"
                                          download={
                                            sectionLecture?.items?.resource
                                              ?.file_name
                                          }
                                          rel="noopener noreferrer"
                                          href={
                                            sectionLecture?.items?.resource
                                              ?.resourceUrl
                                          }
                                        >
                                          {sectionLecture?.items?.resource
                                            ?.downloadable && (
                                            <DownloadOutlined />
                                          )}
                                          {
                                            sectionLecture?.items?.resource
                                              ?.file_name
                                          }
                                        </a>
                                      ),
                                    },
                                  ],
                                }}
                                placement="bottom"
                              >
                                <Button type="text">Resources</Button>
                              </Dropdown>
                            )}
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </ul>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Coursecontent;

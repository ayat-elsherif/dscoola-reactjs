import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Collapse, Modal, Row, Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddIconForCourseContent,
  AddLecOrQuizIcon,
  ArticleIcon,
  DeleteIcon,
  EditIcon,
  ExpandIcon,
} from '../../../../../../../assets/svg';
import DashboardButton from '../../../../../../../components/common/dashboard/components/button';
import {
  fetchOpenAddLecOrQuiz,
  fetchOpenLecOrQuizForm,
  fetchOpenSectionForm,
  fetchshowAddLecIcon,
} from '../../../../../../../features/courseContent/courseContentSlice';
import StepHeader from '../components/stepHeader';
import AddSectionForm from './addSectionForm';
import './index.scss';

import LectuersMap from './lectuersMap';
import ShowAddLecOrQuizLayout from './showAddLecOrQuizLayout';
import fetch from '../../../../../../../auth/AuthInterceptor';
import Loading from '../../../../../../../components/common/dashboard/shared-components/Loading';
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons';

import EditSectionForm from './edit/EditSectionForm';
import { useNavigate } from 'react-router-dom';
import { courseContentInner } from 'features/courseContent/courseContentInner';
import DeleteModal from 'pages/dashboard/myProfile/components/workExperiences/deleteModal';
export default function CourseContent() {
  var x = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sections, setSections] = useState([]);
  const { Panel } = Collapse;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activeDeleteSection, setActiveDeleteSection] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (section) => {
    setShow(true);
    setSectionId(section.id);
  };
  const showAddSectionTitle = useSelector(
    (state) => state.courseContent.openAddSectionForm,
  );
  const showAddLecTyps = useSelector(
    (state) => state.courseContent.openAddLecTypesForm,
  );
  const showAddLecOrQuiz = useSelector(
    (state) => state.courseContent.openAddLecOrQuiz,
  );
  const showAddLecOrQuizForm = useSelector(
    (state) => state.courseContent.openLecOrQuizForm,
  );
  const showAddLecIcon = useSelector(
    (state) => state.courseContent.showAddLecIcon,
  );
  const lecTypesBtnText = useSelector(
    (state) => state.courseContent.lecTypesBtnText,
  );

  const onSuccess = (data) => {
    setSections(data?.data?.sections);
    dispatch(courseContentInner(data?.data));
  };

  const onError = (data) => {};

  const { isLoading, data } = useQuery(
    [`get-course-content`],
    () => {
      return fetch({
        url: `api/lecture/course/${localStorage.getItem('live-course-id')}`,
        method: 'get',
        headers: {
          'public-request': 'true',
        },
      });
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );
  const onDeleteSection = () => {
    const activeId = activeDeleteSection;
    setDeleteLoading(true + activeId);
    fetch({
      url: `api/lecture/section/${activeId} `,
      method: 'delete',
      headers: {
        'public-request': 'true',
      },
    }).then((res) => {
      queryClient.invalidateQueries([`get-course-content`]);
      setDeleteLoading(false);
      setActiveDeleteSection(null);
    });
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
      }}
      spin
    />
  );
  const courseContentInnerSelector = useSelector(
    (state) => state.courseContentInner?.courseContentInner,
  );
  const isLive = courseContentInnerSelector?.course?.type === 'liveClass';

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="intended-learners">
          <StepHeader data={{ title: 'Course content', preview: true }} />
          <div className="intended-learners_body">
            <p>
              Here’s where you add course content—like lectures, course
              sections, assignments, and more. so lets Start putting together
              your course by creating sections, lectures and practice (quizzes,
              coding exercises and assignments).
            </p>
            <DeleteModal
              open={activeDeleteSection}
              handleDelete={onDeleteSection}
              loading={deleteLoading}
              handleCancel={() => setActiveDeleteSection(null)}
              header="Are You sure?"
              body="You Want To Delete This Section ?"
            />
            {sections?.map((section, arrIndex) => {
              return (
                <>
                  <Collapse className="section-collapse" size="large">
                    <Panel
                      header={
                        <>
                          <span className="arr-section-span">
                            {isLive ? 'Week' : 'Section'}
                            {arrIndex + 1}:
                          </span>
                          <ArticleIcon className="article-icon" />
                          <span className="arr-section-title-span">
                            {section.section_name}
                          </span>
                          <EditIcon
                            onClick={() => handleShow(section)}
                            className="edit-icon-course-content action-show animate__pulse"
                          />
                          {deleteLoading == true + section.id || isLoading ? (
                            <Spin indicator={antIcon} />
                          ) : (
                            <DeleteIcon
                              onClick={() => setActiveDeleteSection(section.id)}
                              className="delete-icon-course-content action-show"
                            />
                          )}
                        </>
                      }
                      key={arrIndex}
                    >
                      {showAddLecOrQuiz == arrIndex ? (
                        <ShowAddLecOrQuizLayout
                          arrIndex={arrIndex}
                          showAddLecOrQuizForm={showAddLecOrQuizForm}
                          showAddLecIcon={showAddLecIcon}
                        />
                      ) : (
                        <Row className="lectuersmap-container">
                          {section?.lectures?.map((lectuer, lecIndex) => {
                            if (lectuer.type != null) {
                              //     dispatch(
                              //     fetchopenAddLecTypesForm(
                              //         `[${arrIndex}][${lecIndex}]expand`
                              //     )
                              // );
                              x.push(`${arrIndex}][${lecIndex}]expand`);
                            }
                            return (
                              <>
                                <LectuersMap
                                  lecIndex={lecIndex}
                                  lectuer={lectuer}
                                  arrIndex={arrIndex}
                                  sectionId={section.id}
                                  isLoading={isLoading}
                                  showAddLecTyps={showAddLecTyps}
                                  lecTypesBtnText={lecTypesBtnText}
                                  notNull={
                                    lectuer.type != null &&
                                    `[${arrIndex}][${lecIndex}]expand`
                                  }
                                />
                              </>
                            );
                          })}
                        </Row>
                      )}
                      <Row className="add-lecture-cont">
                        <AddLecOrQuizIcon className="icon-style" />
                        <span
                          className="add-lec-span"
                          onClick={() => {
                            localStorage.setItem('section-id-add', section.id);
                            dispatch(fetchOpenAddLecOrQuiz(arrIndex));
                            dispatch(
                              fetchOpenLecOrQuizForm(
                                `openAddLecForm[${arrIndex}]`,
                              ),
                            );
                          }}
                        >
                          Lecture
                        </span>
                        <AddLecOrQuizIcon className="icon-style" />
                        <span
                          onClick={() => {
                            localStorage.setItem('section-id-add', section.id);
                            dispatch(fetchOpenAddLecOrQuiz(arrIndex));
                            dispatch(
                              fetchOpenLecOrQuizForm(
                                `openAddQuizForm[${arrIndex}]`,
                              ),
                            );
                          }}
                          className="add-quiz-span"
                        >
                          Quiz
                        </span>
                      </Row>
                    </Panel>
                  </Collapse>
                </>
              );
            })}

            {(() => {
              if (showAddSectionTitle) {
                return (
                  <div className="add-section-form-container">
                    <AddSectionForm />
                  </div>
                );
              } else {
                return (
                  <Row align="middle" className="section-container">
                    <Col
                      onClick={() => {
                        dispatch(fetchOpenSectionForm(true));
                      }}
                      className="AddIcon-For-Course-Content"
                    >
                      <AddIconForCourseContent /> Add New Section
                    </Col>
                  </Row>
                );
              }
            })()}

            <div className="action-container">
              <DashboardButton
                text="Next Step"
                onclick={() =>
                  navigate('/instructor-dashboard/courses/add/course-pricing')
                }
                type="link"
                cssStyle={{ height: '41px', width: '120px' }}
              />
            </div>
          </div>
          <Modal
            open={show}
            onCancel={handleClose}
            title="Edit Section"
            destroyOnClose
            footer={false}
            width="484px"
          >
            <EditSectionForm
              closeModal={() => setShow(false)}
              section={sectionId}
            />
          </Modal>
        </div>
      )}
    </>
  );
}

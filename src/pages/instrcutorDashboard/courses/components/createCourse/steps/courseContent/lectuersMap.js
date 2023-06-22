import { LoadingOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, message, Modal, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArticleIcon,
  CloseLecIcon,
  CollapsIcon,
  DeleteIcon,
  EditIcon,
  ExpandIcon,
  QuizIcon,
} from '../../../../../../../assets/svg';
import {
  fetchlecTypesBtnText,
  fetchlecTypeToggel,
  fetchopenAddLecTypesForm,
  fetchopenAddQuizTypesForm,
  fetchOpenLecOrQuizForm,
} from '../../../../../../../features/courseContent/courseContentSlice';
import LectuerInfo from './lectuerInfo';
import LectuerTypesContainer from './lectuerTypesContainer';
import fetch from '../../../../../../../auth/AuthInterceptor';
import EditLectuerForm from './edit/EditLectuerForm';
import QuizTypesContainer from './QuizTypeContainer';
import DeleteModal from 'pages/dashboard/myProfile/components/workExperiences/deleteModal';

export default function LectuersMap({
  lecIndex,
  lectuer,
  arrIndex,
  showAddLecTyps,
  lecTypesBtnText,
  notNull,
  isLoading,
  sectionId,
}) {
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activeDeleteLec, setActiveDeleteLec] = useState(false);

  const showAddQuizTyps = useSelector(
    (state) => state.courseContent.openAddQuizTypesForm,
  );

  const handleClose = () => setShow(false);
  const queryClient = useQueryClient();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
      }}
      spin
    />
  );

  const onDeleteLec = () => {
    const activeId = activeDeleteLec;
    setDeleteLoading(true + sectionId + activeId);
    fetch({
      url: `api/lecture/section/${sectionId}/lecture/${activeId} `,
      method: 'delete',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        queryClient.invalidateQueries([`get-course-content`]);
        setDeleteLoading(false);
        setActiveDeleteLec(null);
      })
      .catch((err) => {
        setDeleteLoading(false);
        message.error('something went wrong');
      });
  };

  const handleShow = (section, lecuer) => {
    setShow(true);
    // setSectionId(section.id);
    // setLectuerId(section.id);
  };

  return (
    <>
      <div className="article-container">
        <div className="article-container-flex">
          <Row align="middle">
            <Col>
              <span className="arr-title-span">
                {lectuer?.item_type === 'quiz' ? 'Quiz' : 'Lectuer'}
                {lecIndex + 1}:
              </span>
            </Col>

            <Col>
              {' '}
              {lectuer?.item_type === 'quiz' ? (
                <QuizIcon className="article-icon" />
              ) : (
                <ArticleIcon className="article-icon" />
              )}
            </Col>

            <Col>
              <span className="arr-section-title-span">{lectuer.title}</span>
            </Col>

            <EditIcon
              onClick={() => handleShow('section')}
              className="edit-icon-course-content article-actions"
            />
            {deleteLoading == true + sectionId + lectuer.id || isLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              <DeleteIcon
                onClick={() => setActiveDeleteLec(lectuer.id)}
                className="delete-icon-course-content article-actions"
              />
            )}
          </Row>
          <DeleteModal
            open={activeDeleteLec}
            handleDelete={onDeleteLec}
            loading={deleteLoading}
            handleCancel={() => setActiveDeleteLec(null)}
            header="Are You sure?"
            body="You Want To Delete This Lecture ?"
          />

          {(() => {
            if (`[${arrIndex}][${lecIndex}]` === showAddLecTyps) {
              return (
                <div className="dinamic-lec-type-btn">
                  <span className="dinamic-lec-type-text">
                    {lecTypesBtnText}
                  </span>
                  <CloseLecIcon
                    className="closelec-icon"
                    onClick={() => {
                      dispatch(fetchopenAddLecTypesForm('close'));
                    }}
                  />
                </div>
              );
            } else if (`[${arrIndex}][${lecIndex}]` === showAddQuizTyps) {
              return (
                <div className="dinamic-lec-type-btn">
                  <span className="dinamic-lec-type-text">
                    {lecTypesBtnText}
                  </span>
                  <CloseLecIcon
                    className="closelec-icon"
                    onClick={() => {
                      dispatch(fetchopenAddQuizTypesForm('close'));
                    }}
                  />
                </div>
              );
            } else if (
              `[${arrIndex}][${lecIndex}]collaps` == showAddLecTyps ||
              `[${arrIndex}][${lecIndex}]collaps-quiz` == showAddQuizTyps
            ) {
              return (
                <div>
                  <CollapsIcon
                    className="expand-collaps-icon"
                    onClick={() => {
                      if (lectuer?.item_type === 'quiz') {
                        dispatch(
                          fetchopenAddQuizTypesForm(
                            `[${arrIndex}][${lecIndex}]expand-quiz`,
                          ),
                        );
                      } else {
                        dispatch(
                          fetchopenAddLecTypesForm(
                            `[${arrIndex}][${lecIndex}]expand`,
                          ),
                        );
                      }
                    }}
                  />
                </div>
              );
            } else if (
              `[${arrIndex}][${lecIndex}]expand` == showAddLecTyps ||
              `[${arrIndex}][${lecIndex}]expand-quiz` == showAddQuizTyps ||
              `[${arrIndex}][${lecIndex}]expand` == notNull
            ) {
              return (
                <div>
                  <ExpandIcon
                    className="expand-collaps-icon"
                    onClick={() => {
                      if (lectuer?.item_type === 'quiz') {
                        dispatch(
                          fetchopenAddQuizTypesForm(
                            `[${arrIndex}][${lecIndex}]collaps-quiz`,
                          ),
                        );
                      } else {
                        dispatch(
                          fetchopenAddLecTypesForm(
                            `[${arrIndex}][${lecIndex}]collaps`,
                          ),
                        );
                      }
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  {lectuer?.item_type === 'quiz' ? (
                    <>
                      <button
                        onClick={() => {
                          dispatch(
                            fetchopenAddQuizTypesForm(
                              `[${arrIndex}][${lecIndex}]`,
                            ),
                          );
                          dispatch(
                            fetchlecTypesBtnText('Select Questions type'),
                          );
                          dispatch(fetchlecTypeToggel(`init`));
                        }}
                        className="add-lec-btn"
                      >
                        + Questions
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          dispatch(
                            fetchopenAddLecTypesForm(
                              `[${arrIndex}][${lecIndex}]`,
                            ),
                          );
                          dispatch(fetchlecTypesBtnText('Select Content type'));
                          dispatch(fetchlecTypeToggel(`init`));
                        }}
                        className="add-lec-btn"
                      >
                        + Content
                      </button>
                    </>
                  )}
                </div>
              );
            }
          })()}
        </div>

        {`[${arrIndex}][${lecIndex}]` === showAddLecTyps && (
          <LectuerTypesContainer
            arrIndex={arrIndex}
            lecIndex={lecIndex}
            lectuer={lectuer}
            sectionId={sectionId}
          />
        )}
        {`[${arrIndex}][${lecIndex}]` === showAddQuizTyps && (
          <QuizTypesContainer
            arrIndex={arrIndex}
            lecIndex={lecIndex}
            lectuer={lectuer}
            sectionId={sectionId}
          />
        )}

        {`[${arrIndex}][${lecIndex}]collaps` == showAddLecTyps && (
          <LectuerInfo
            lectuer={lectuer}
            arrIndex={arrIndex}
            lecIndex={lecIndex}
            sectionId={sectionId}
          />
        )}
        {`[${arrIndex}][${lecIndex}]collaps-quiz` == showAddQuizTyps && (
          <LectuerInfo
            lectuer={lectuer}
            arrIndex={arrIndex}
            lecIndex={lecIndex}
            sectionId={sectionId}
          />
        )}
      </div>
      <Modal
        title="Edit Lecture"
        destroyOnClose
        open={show}
        onCancel={handleClose}
        footer={false}
        width="484px"
      >
        <EditLectuerForm
          closeModal={handleClose}
          sectionId={sectionId}
          lectuer={lectuer}
        />
      </Modal>
    </>
  );
}

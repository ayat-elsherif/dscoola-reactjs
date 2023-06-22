import { LoadingOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Divider, message, Row, Spin, Switch } from 'antd';

import useApi from 'network/useApi';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  ArticlePlaceholder,
  DeleteIcon,
  DeleteIconCourseContent,
  EditIcon,
  LiveSessionPlaceholder,
  SmallEditIcon,
  VideoPlaceholder,
} from '../../../../../../../assets/svg';
import { fetchaddDesc } from '../../../../../../../features/courseContent/courseContentSlice';
import AddDescForm from './addDescForm';
import AddResourseForm from './addResourseForm';
import QuizInfo from './lecTypesCreation/quiz/quizInfo';
import Article from './lecTypesCreation/article';
import LiveSession from './lecTypesCreation/liveSession';
import Video from './lecTypesCreation/video';
import VideoSlide from './lecTypesCreation/video&slide';
import dayjs from 'dayjs';

export default function LectuerInfo({
  lectuer,
  lecIndex,
  arrIndex,
  sectionId,
}) {
  const dispatch = useDispatch();
  const api = useApi();
  const [switchLoading, setSwitchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteDescLoading, setDeleteDescLoading] = useState(false);
  console.log(lectuer, 'jvjhbkjby');
  const isTypeAreical = lectuer?.items?.artical
    ? Object.keys(lectuer?.items?.artical)?.length !== 0
    : false;
  const isTypelive = lectuer?.items?.zoomMeeting
    ? Object.keys(lectuer?.items?.zoomMeeting)?.length !== 0
    : false;
  const isTypeSlide = lectuer?.items?.slide
    ? Object.keys(lectuer?.items?.slide)?.length !== 0
    : false;
  const isTypeVideo =
    lectuer?.items?.video && !isTypeSlide
      ? Object.keys(lectuer?.items?.video)?.length !== 0
      : false;

  const openDescOrResource = useSelector(
    (state) => state.courseContent.addDesc,
  );
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 16,
      }}
      spin
    />
  );

  const onChange = (checked) => {
    setSwitchLoading(true);
    const data = { downloadable: checked };
    api
      .put(`lecture/${lectuer.id}/downloadable/toggle`, data)
      .then(() => {
        setSwitchLoading(false);
      })

      .catch(() => {
        setSwitchLoading(false);
        message.error('someting went wrong');
      });
  };
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = () => {
    setDeleteLoading(true);
    api
      .delete(`lecture/${lectuer.id}/resource/${lectuer?.items?.resource?.id}`)
      .then(() => {
        queryClient.invalidateQueries([`get-course-content`]);
        setDeleteLoading(false);
      })
      .catch(() => {
        setDeleteLoading(false);
      });
  };
  const onDeleteDesc = () => {
    setDeleteDescLoading(true);

    api
      .put(`lecture/${lectuer.id}/description`, { description: null })
      .then(() => {
        setDeleteDescLoading(false);
        message.success('Deleted successfully!');
        queryClient.invalidateQueries([`get-course-content`]);
      })
      .catch((err) => {
        setDeleteDescLoading(false);
        message.success('Something Went Wrong!');
      });
  };
  return (
    <>
      {lectuer.type === 'quiz' ? (
        <QuizInfo
          lectuer={lectuer}
          lecIndex={lecIndex}
          arrIndex={arrIndex}
          sectionId={sectionId}
        />
      ) : (
        <>
          {' '}
          <Row justify="space-between" className="lec-info-containrt">
            <Col className="lec-info-left-containrt">
              <Row>
                <Col className="lec-video-img">
                  {isTypelive && <LiveSessionPlaceholder />}
                  {isTypeVideo && <VideoPlaceholder />}
                  {isTypeAreical && <ArticlePlaceholder />}
                  {isTypeSlide && <VideoPlaceholder />}
                </Col>
                <Col>
                  <div className="lec-title">{lectuer.title}</div>
                  <div className="lec-duration">
                    {isTypelive
                      ? dayjs(
                          lectuer?.items?.zoom_bundle_session?.start_date,
                        ).format('MMM D, YYYY H:mm a')
                      : lectuer?.total_duration != null
                      ? lectuer?.total_duration?.slice(0, -3)
                      : ''}
                  </div>
                  <div className="lec-edit">
                    <SmallEditIcon className="lec-edit-icon" />
                    <span onClick={() => setShow(true)}>Edit Content</span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="lec-info-right-containrt">
              <div className="lec-downloadable">
                <span className="downloadable">Downloadable:</span>{' '}
                <Switch
                  defaultChecked={lectuer?.downloadable}
                  onChange={onChange}
                  loading={switchLoading}
                />
              </div>
            </Col>
          </Row>
          <Row className="lec-info-desc-containrt">
            {(() => {
              if (openDescOrResource == `open desc[${arrIndex}][${lecIndex}]`) {
                return <AddDescForm lectuer={lectuer} sectionId={sectionId} />;
              } else if (
                openDescOrResource == `open resource[${arrIndex}][${lecIndex}]`
              ) {
                return (
                  <AddResourseForm lectuer={lectuer} sectionId={sectionId} />
                );
              } else {
                return (
                  <>
                    {' '}
                    {lectuer.text ? (
                      <div className="desc-container-after show-actions">
                        <Row gutter={[16]} className="desc-title-after">
                          <Col>Description</Col>
                          <Col className="show-actions-icon">
                            <EditIcon
                              onClick={() =>
                                dispatch(
                                  fetchaddDesc(
                                    `open desc[${arrIndex}][${lecIndex}]`,
                                  ),
                                )
                              }
                              className="delete-res"
                            />
                          </Col>
                          <Col className="show-actions-icon">
                            {deleteDescLoading ? (
                              <Spin indicator={antIcon} />
                            ) : (
                              <DeleteIcon
                                onClick={onDeleteDesc}
                                className="delete-res"
                              />
                            )}
                          </Col>
                        </Row>
                        <div
                          style={{ fontSize: '13px' }}
                          dangerouslySetInnerHTML={{
                            __html: lectuer?.text,
                          }}
                          className="desc-content-after"
                        ></div>
                      </div>
                    ) : (
                      <Button
                        onClick={() =>
                          dispatch(
                            fetchaddDesc(`open desc[${arrIndex}][${lecIndex}]`),
                          )
                        }
                        className="lec-info-desc-btn"
                      >
                        Description
                      </Button>
                    )}
                    {lectuer?.items?.resource?.file_url && (
                      <div className="desc-container-after">
                        <div className="desc-title-after">
                          Downloadable materials
                        </div>
                        <div className="desc-content-after">
                          <Row justify="space-between">
                            <Col>
                              {lectuer?.items?.resource?.file_url.slice(
                                21,
                                100,
                              )}
                            </Col>
                            <Col>
                              {deleteLoading ? (
                                <Spin indicator={antIcon} />
                              ) : (
                                <DeleteIcon
                                  className="delete-res"
                                  onClick={handleDelete}
                                />
                              )}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={() => {
                        dispatch(
                          fetchaddDesc(
                            `open resource[${arrIndex}][${lecIndex}]`,
                          ),
                        );
                      }}
                      className="lec-info-desc-btn"
                    >
                      {/* <ResourceIcon className="lec-info-desc-icon" /> */}
                      Resources
                    </Button>
                  </>
                );
              }
            })()}
          </Row>
        </>
      )}

      <Modal
        title="Edit Lectuer :"
        destroyOnClose
        className="edit-lec-modal"
        centered
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
        width={550}
      >
        {isTypeVideo && (
          <Video lectuer={lectuer} sectionId={sectionId} onEdit={true} />
        )}
        {isTypeAreical && (
          <Article lectuer={lectuer} sectionId={sectionId} onEdit={true} />
        )}
        {/* {isTypelive && (
          <LiveSession lectuer={lectuer} sectionId={sectionId} onEdit={true} />
        )} */}
        {isTypeSlide && (
          <VideoSlide lectuer={lectuer} sectionId={sectionId} onEdit={true} />
        )}
      </Modal>
    </>
  );
}

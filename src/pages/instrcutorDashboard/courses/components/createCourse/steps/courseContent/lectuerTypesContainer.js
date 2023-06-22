import { Col, Row, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArticleTypeIcon,
  LivesessionTypeIcon,
  VideoTypeIcon,
} from '../../../../../../../assets/svg';
import {
  fetchlecTypesBtnText,
  fetchlecTypeToggel,
  fetchopenAddLecTypesForm,
} from '../../../../../../../features/courseContent/courseContentSlice';
import Article from './lecTypesCreation/article';
import LiveSession from './lecTypesCreation/liveSession';
import Video from './lecTypesCreation/video';
import VideoSlide from './lecTypesCreation/video&slide';
import useApi from 'network/useApi';
import { useQueryClient } from '@tanstack/react-query';

export default function LectuerTypesContainer({
  arrIndex,
  lecIndex,
  lectuer,
  sectionId,
}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const api = useApi();
  const lecType = useSelector((state) => state.courseContent.lecTypeToggel);
  const courseContentInner = useSelector(
    (state) => state.courseContentInner?.courseContentInner,
  );
  const isLive = courseContentInner?.course?.type === 'liveClass';
  const onFinish = () => {
    const data = {};

    data.type = 'livesession';
    data.item_type = 'lecture';
    data.bundle_id = 5;

    api
      .put(`lecture/section/${sectionId}/lecture/${lectuer.id}`, data)
      .then(() => {
        message.success('add successfully!');
        queryClient.invalidateQueries([`get-course-content`]);
        dispatch(fetchopenAddLecTypesForm('close'));
      })
      .catch(() => {
        dispatch(fetchopenAddLecTypesForm('close'));
        message.error('something went wrong!');
      });
  };

  return (
    <>
      {' '}
      {lecType == 'init' ? (
        <div className="lec-types-container">
          <Row className="lec-row-types-container">
            <Col
              onClick={() => {
                dispatch(fetchlecTypeToggel(`[${arrIndex}][${lecIndex}]video`));
                dispatch(fetchlecTypesBtnText('Add Video'));
              }}
              className="lec-type-col"
            >
              <div className="icon-container">
                <VideoTypeIcon className="svg-center" />
              </div>
              <div className="type-text">Video</div>
            </Col>
            <Col
              onClick={() => {
                dispatch(
                  fetchlecTypeToggel(`[${arrIndex}][${lecIndex}]article`),
                );

                dispatch(fetchlecTypesBtnText('Add Article'));
              }}
              className="lec-type-col"
            >
              <div className="icon-container">
                <ArticleTypeIcon className="svg-center" />
              </div>
              <div className="type-text">Aricle</div>
            </Col>
            <Col
              onClick={() => {
                dispatch(
                  fetchlecTypeToggel(`[${arrIndex}][${lecIndex}]video&slide`),
                );

                dispatch(fetchlecTypesBtnText('Add Video & Slide'));
              }}
              className="lec-type-col"
            >
              <div className="icon-container">
                <VideoTypeIcon className="svg-center" />
              </div>
              <div className="type-text">Video&slide</div>
            </Col>
            <Col className="lec-type-col">
              {' '}
              <div
                onClick={() => {
                  if (isLive) {
                    onFinish();
                  } else {
                    dispatch(
                      fetchlecTypeToggel(
                        `[${arrIndex}][${lecIndex}]live Session`,
                      ),
                    );
                    dispatch(fetchlecTypesBtnText('Add Live Sessions'));
                  }
                }}
                className="icon-container"
              >
                <LivesessionTypeIcon className="svg-center" />
              </div>
              <div className="type-text">Live Session</div>
            </Col>
          </Row>
        </div>
      ) : (
        <>
          {lecType == `[${arrIndex}][${lecIndex}]video` && (
            <Video
              arrIndex={arrIndex}
              lecIndex={lecIndex}
              lectuer={lectuer}
              sectionId={sectionId}
            />
          )}
          {lecType == `[${arrIndex}][${lecIndex}]article` && (
            <Article lectuer={lectuer} sectionId={sectionId} />
          )}
          {lecType == `[${arrIndex}][${lecIndex}]video&slide` && (
            <VideoSlide lectuer={lectuer} sectionId={sectionId} />
          )}
          {lecType == `[${arrIndex}][${lecIndex}]live Session` && (
            <LiveSession lectuer={lectuer} sectionId={sectionId} />
          )}
        </>
      )}
    </>
  );
}

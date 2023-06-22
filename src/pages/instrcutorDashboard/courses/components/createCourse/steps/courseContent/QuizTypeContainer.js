import { Col, Row } from 'antd';
import { ArticleTypeIcon, VideoTypeIcon } from 'assets/svg';
import {
  fetchlecTypesBtnText,
  fetchlecTypeToggel,
} from 'features/courseContent/courseContentSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from './lecTypesCreation/article';
import SingleChoisQuiz from './lecTypesCreation/quiz/SingleChoisQuiz';
import Video from './lecTypesCreation/video';

const QuizTypesContainer = ({ arrIndex, lecIndex, lectuer, sectionId }) => {
  const dispatch = useDispatch();
  const lecType = useSelector((state) => state.courseContent.lecTypeToggel);
  console.log(lecType, 'csdfghnhgfd');
  return (
    <>
      {' '}
      {lecType === 'init' ? (
        <div className="lec-types-container">
          <Row className="lec-row-types-container">
            <Col
              onClick={() => {
                dispatch(
                  fetchlecTypeToggel(
                    `[${arrIndex}][${lecIndex}]quiz-single-choise`,
                  ),
                );
                dispatch(fetchlecTypesBtnText('Add Single Choise'));
              }}
              className="lec-type-col"
            >
              <div className="icon-container">
                <ArticleTypeIcon className="svg-center" />
              </div>
              <div className="type-text">Single choice</div>
            </Col>
            {/* <Col
              // onClick={() => {
              //     dispatch(
              //         fetchlecTypeToggel(
              //             `[${arrIndex}][${lecIndex}]article`
              //         )
              //     );

              //     dispatch(fetchlecTypesBtnText("Add Article"));
              // }}
              className="lec-type-col"
            >
              <div className="icon-container">
                <ArticleTypeIcon className="svg-center" />
              </div>
              <div className="type-text">Multiple choice</div>
            </Col> */}
          </Row>
        </div>
      ) : (
        <>
          {lecType == `[${arrIndex}][${lecIndex}]quiz-single-choise` && (
            <SingleChoisQuiz
              arrIndex={arrIndex}
              lecIndex={lecIndex}
              lectuer={lectuer}
              sectionId={sectionId}
            />
          )}
        </>
      )}
    </>
  );
};

export default QuizTypesContainer;

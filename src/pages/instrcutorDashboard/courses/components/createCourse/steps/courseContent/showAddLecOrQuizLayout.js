import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AddLecOrQuizIcon,
  CloseLecIcon,
} from '../../../../../../../assets/svg';
import {
  fetchOpenAddLecOrQuiz,
  fetchOpenLecOrQuizForm,
  fetchshowAddLecIcon,
} from '../../../../../../../features/courseContent/courseContentSlice';
import AddLecTitleForm from './addLecTitleForm';
import AddQuizTitleForm from './addQuizTitleForm';

export default function ShowAddLecOrQuizLayout({
  arrIndex,
  showAddLecOrQuizForm,
  showAddLecIcon,
}) {
  const dispatch = useDispatch();
  console.log(showAddLecOrQuizForm, 'showAddLecOrQuizForm');
  return (
    <>
      {(() => {
        if (showAddLecOrQuizForm == `openAddLecForm[${arrIndex}]`) {
          return <AddLecTitleForm arrIndex={arrIndex} />;
        } else if (showAddLecOrQuizForm == `openAddQuizForm[${arrIndex}]`) {
          return <AddQuizTitleForm />;
        } else {
          return (
            <div className="showAddLecOrQuiz">
              <div
                onClick={() => {
                  dispatch(fetchOpenAddLecOrQuiz((arrIndex + 1) * -1));
                  dispatch(fetchshowAddLecIcon(`show[${arrIndex}]`));
                }}
                className="close-lec-icon"
              >
                <CloseLecIcon />
              </div>
              <AddLecOrQuizIcon className="icon-style" />
              <span
                className="add-lec-span"
                onClick={() => {
                  dispatch(
                    fetchOpenLecOrQuizForm(`openAddLecForm[${arrIndex}]`),
                  );
                }}
              >
                Lecture
              </span>
              <AddLecOrQuizIcon className="icon-style" />
              <span
                onClick={() => {
                  dispatch(
                    fetchOpenLecOrQuizForm(`openAddQuizForm[${arrIndex}]`),
                  );
                }}
                className="add-quiz-span"
              >
                Quiz
              </span>
            </div>
          );
        }
      })()}
    </>
  );
}

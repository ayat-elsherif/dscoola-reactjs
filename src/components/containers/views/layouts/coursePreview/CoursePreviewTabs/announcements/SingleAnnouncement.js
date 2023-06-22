import { Button } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DraftTextEditor from '../questionAndAnswers/DraftTextEditor';
import InstructorPost from './InstructorPost';
import StudentComment from './StudentComment';

function SingleAnnouncement({ index, id, response }) {
  const comments = [];
  let dataFromEndpoint = () => {
    if (response.comments) {
      comments = response?.comments?.map((item, i) => {
        if (i >= 3) {
          return (
            <Link to="#">
              <div className="mb-3">
                See More{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8.16"
                  height="4.666"
                  viewBox="0 0 8.16 4.666"
                >
                  <path
                    id="Icon_ionic-ios-arrow-forward"
                    data-name="Icon ionic-ios-arrow-forward"
                    d="M14.506,10.275,11.418,7.189a.581.581,0,0,1,0-.824.588.588,0,0,1,.826,0l3.5,3.5a.582.582,0,0,1,.017.8l-3.513,3.52a.583.583,0,0,1-.826-.824Z"
                    transform="translate(14.356 -11.246) rotate(90)"
                    fill="#7e59d1"
                  />
                </svg>
              </div>
            </Link>
          );
        } else {
          <StudentComment i={i} id={i} item={item} />;
        }
      });
    }
    return comments;
  };

  return (
    <div className="singleComment" key={index} id={id}>
      <InstructorPost response={response} />
      <form>
        <div className="row mt-5">
          <figure className="col-md-1">
            <img
              src="/assets/images/instructors/Kayla-Person.png"
              alt="kayla"
            />
          </figure>
          <div className="col-md-11">
            {/* <TextEditor /> */}
            <DraftTextEditor />
          </div>
        </div>
        <div className="text-end mt-3">
          <Button type="primary" size="small" htmlType="submit">
            add Comment
          </Button>
        </div>
      </form>
      <div className="studentComment">
        {dataFromEndpoint().length > 0 ? (
          dataFromEndpoint()
        ) : (
          <div className="text-muted mb-4">No comments yet</div>
        )}
      </div>
    </div>
  );
}

export default SingleAnnouncement;

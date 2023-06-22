import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import StudentComment from '../announcements/StudentComment';
import DraftTextEditor from './DraftTextEditor';

function SingleQuestion({ handleQuestion }) {
  let myData = handleQuestion();
  let fakeArr = [];
  let dataFromEndpoint = () => {
    let myArr = [];
    fakeArr.length = 5;

    for (let i = 0; i < fakeArr.length; i++) {
      if (i >= 3) {
        myArr.push(
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
          </Link>,
        );
        break;
      } else {
        myArr.push(<StudentComment i={i} id={i} />);
      }
    }
    return myArr;
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => handleQuestion(1)}>
          <a> All Questions</a>
        </Breadcrumb.Item>

        <Breadcrumb.Item>How to download photoshop? {myData}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="singleComment">
        <div className="d-flex align-items-start">
          <figure>
            <img src="/assets/images/instructors/Christian.jpg" alt="" />
          </figure>
          <div className="commentnDetail">
            <h5>How to download photoshop? </h5>
            <Link to="#">
              <span>Mohamed Sherif </span>
            </Link>
            . 1 week ago
            <div className="commentBody">
              <p>
                Hi everyone, my problem is that following all the steps in the
                video, I can't copy and past all the steps in the video{' '}
              </p>
              <p>
                The Sprint itself, that’s a part of the events right? In the
                scrum guide{' '}
              </p>{' '}
              <p>
                they are talking about 5 events (Scrum guide page 4 inspection).
                And in your presentation you talk about 4. Is there a reason why
                you only mentioned 4 of them in this particular slide?
              </p>
            </div>
          </div>
        </div>
        <form>
          <div className="row mt-5">
            <figure className="col-md-1">
              <img src="/assets/images/instructors/Kayla-Person.png" alt="" />
            </figure>
            <div className="col-md-11">
              {/* <TextEditor /> */}
              {/* <QuillEditor /> */}
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
          {dataFromEndpoint().length > 0
            ? dataFromEndpoint()
            : 'no comments yet'}
        </div>
      </div>
    </div>
  );
}

export default SingleQuestion;

import React from 'react';
import { Button, Form, Input } from 'antd';
// import TextEditor from "../../../../../../../helpers/textEditor/TextEditor";
// import { Link } from "react-router-dom";
// import SmlButton from "../../../../../../../helpers/Buttons/SmlButton";
import DraftTextEditor from './DraftTextEditor';
function AskQuestions() {
  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {};

  return (
    <div>
      {/* <h4>AskQuestions</h4> */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="full-width"
          label="Title"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter a title for your question',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="full-width"
          label="Your Question"
          name="textEditor"
        >
          <DraftTextEditor />
          {/* <div className="textEditor-withRecord">
            <Link to="#" className="recordMessage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                viewBox="0 0 25 25"
              >
                <defs>
                  <clipPath id="clip-path4">
                    <rect
                      id="Rectangle_1422"
                      dataName="Rectangle 1422"
                      width="13"
                      height="13"
                      transform="translate(0.227)"
                      fill="#fff"
                      stroke="#707070"
                      strokeWidth="1"
                    />
                  </clipPath>
                </defs>
                <g
                  id="Group_10168"
                  data-name="Group 10168"
                  transform="translate(-0.227)"
                >
                  <circle
                    id="Ellipse_748"
                    dataName="Ellipse 748"
                    cx="12.5"
                    cy="12.5"
                    r="12.5"
                    transform="translate(0.227)"
                    fill="#7e59d1"
                  />
                  <g
                    id="Mask_Group_318"
                    dataName="Mask Group 318"
                    transform="translate(6 6)"
                    clipPath="url(#clip-path4)"
                  >
                    <g
                      id="svgexport-6_-_2022-01-25T134043.028"
                      data-name="svgexport-6 - 2022-01-25T134043.028"
                      transform="translate(2.024 0.463)"
                    >
                      <g id="Group_3478" data-name="Group 3478">
                        <g id="Group_3477" data-name="Group 3477">
                          <path
                            id="Path_7861"
                            data-name="Path 7861"
                            d="M6.336,8.409A2.342,2.342,0,0,0,8.671,6.073V2.336A2.249,2.249,0,0,0,7.985.686,2.249,2.249,0,0,0,6.336,0a2.25,2.25,0,0,0-1.65.686A2.249,2.249,0,0,0,4,2.336V6.073A2.342,2.342,0,0,0,6.336,8.409Z"
                            transform="translate(-2.131)"
                            fill="#fff"
                          />
                          <path
                            id="Path_7862"
                            data-name="Path 7862"
                            d="M10.27,5.139a.467.467,0,0,0-.8.328V6.4a3.149,3.149,0,0,1-.96,2.31,3.149,3.149,0,0,1-2.31.96,3.15,3.15,0,0,1-2.31-.96,3.149,3.149,0,0,1-.96-2.31V5.467a.465.465,0,0,0-.8-.328A.449.449,0,0,0,2,5.467V6.4A4.054,4.054,0,0,0,3.077,9.208a4.077,4.077,0,0,0,2.661,1.368v.964H3.869a.467.467,0,0,0,0,.934H8.54a.467.467,0,0,0,0-.934H6.672v-.964A4.077,4.077,0,0,0,9.332,9.208,4.054,4.054,0,0,0,10.409,6.4V5.467A.449.449,0,0,0,10.27,5.139Z"
                            transform="translate(-2 -0.328)"
                            fill="#fff"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          </div> */}
        </Form.Item>
        <div className="text-end  mt-4 mb-4">
          <Button type="primary" size="small" htmlType="submit">
            add publish
          </Button>
          {/* <SmlButton text="publish" btnClass="modalSubmit" type="submit" /> */}
        </div>
      </Form>
    </div>
  );
}

export default AskQuestions;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.scss';
const DraftTextEditor = ({ placeholder, callBack }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [convertedContent, setConvertedContent] = useState();
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    callBack(currentContentAsHTML);
  };

  return (
    <div className="textEditor-withRecord">
      <Editor
        placeholder={placeholder ? placeholder : 'Enter Your Question...'}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['blockType', 'inline', 'link', 'colorPicker', 'list'],
          inline: {
            options: ['bold', 'italic', 'underline'],
            bold: { className: 'bold-option-classname' },
            italic: { className: 'italic-option-classname' },
            underline: { className: 'bordered-option-classname' },
          },
          blockType: {
            className: 'blockType-option-classname',
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
            component: undefined,
            dropdownClassName: undefined,
          },
          code: {
            className: undefined,
          },
          link: {
            inDropdown: false,
            className: 'link-option-classname',
            component: undefined,
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link'],
            link: { className: 'linked-option-classname' },
            //   unlink: { className: "linked-option-classname" },
            linkCallback: undefined,
          },
          colorPicker: {
            className: 'color-option-custom',
            popupClassName: 'demo-popup-custom',
          },
          list: {
            inDropdown: true,
            className: 'list-option-classname',
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
            unordered: { className: undefined },
            ordered: { className: undefined },
          },
        }}
      />
      {/* <Link to="#" className="recordMessage">
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
      </Link> */}
      <div className="textEditorHTML">
        {handleEditorChange} <br />
      </div>
    </div>
  );
};

export default DraftTextEditor;

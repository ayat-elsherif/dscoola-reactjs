import { css } from '@emotion/css';
import { Button } from 'antd';
import { DeleteIcon, MicIcon } from 'assets/svg';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import SoundRecordPopup from './SoundRecordPopup';
import vmsg from 'vmsg';
import useStopwatch from 'Hooks/utils/useStopwatch';

const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm',
});

function OwnTextEditor({
  textEdit,
  setTextEdit,
  record,
  setRecord,
  placeholder,
  rest,
  isRecordable = true,
}) {
  // const [record, setRecord] = useState(null);
  // // console.log('OwnTextEditor  record', record);

  const OwnTextEditorStyles = css`
    position: relative;

    .quill {
      /* border: 1px solid #e0e0f5; */
      border-radius: 4px;
      .ql-toolbar {
        padding: 0.5rem 0.8rem;
        background-color: #efeff6;
        border-bottom: 1px solid #e0e0f5;
        border-radius: 4px 4px 0px 0px;
      }
      .ql-editor {
        min-height: 10rem;
        max-height: 24rem;
        padding-top: ${record ? '8rem' : '1rem'};
      }

      .ql-toolbar .ql-stroke {
        fill: none;
        stroke: #6a6f73;
      }

      .ql-toolbar .ql-fill {
        fill: #6a6f73;
        stroke: none;
      }

      .ql-toolbar .ql-picker {
        color: #6a6f73;
      }
    }

    .sound-recorder-wrapper {
      position: absolute;
      top: 0.75rem;
      right: 1.7rem;
      .btn-record {
        background-color: #7e59d1;
        min-width: auto;
        width: 2.5rem;
        height: 2.5rem;
      }

      .popup-wrapper {
        position: absolute;
        right: 1rem;
        top: 4rem;
      }
    }

    .record {
      width: 40rem;
      position: absolute;
      left: 1.5rem;
      top: 4.5rem;
    }
  `;

  const [isSoundPopup, setIsSoundPopup] = useState(false);
  // const [isRecordLod, setIsRecordLod] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { startTimer, stopTimer, count, format } = useStopwatch();
  // console.log('format', format());
  // console.log('count', count);

  // const getRecordLeng = ()=>{
  //   const leng = setInterval(()=>setRecordLeng(prev=>prev+1))
  // }
  // const getRecordLeng = setInterval(
  //   () => setRecordLeng((prev) => prev + 1),
  //   1000,
  // );
  const startRecord = async () => {
    try {
      await recorder.initAudio();
      await recorder.initWorker();
      recorder.startRecording();
      startTimer();
      // setIsRecordLod(false);
      setIsRecording(true);
    } catch (error) {
      // console.log('onRecord  error', error);
      // setIsRecordLod(false);
    }
  };

  const stopRecord = async () => {
    // setIsRecordLod(false);
    setIsRecording(false);
    setIsSoundPopup(false);
    stopTimer();

    return await recorder.stopRecording();
  };
  const onRecord = async () => {
    setIsSoundPopup(true);
    await startRecord();
  };
  const confirmRecord = async () => {
    const blob = await stopRecord();
    setRecord({ file: blob, url: URL.createObjectURL(blob) });
  };

  return (
    <div className={OwnTextEditorStyles}>
      <ReactQuill
        theme="snow"
        value={textEdit}
        onChange={setTextEdit}
        placeholder={placeholder}
        modules={{
          toolbar: [
            [
              { size: ['small', false, 'large', 'huge'] },
              'bold',
              'italic',
              'link',
              'image',
              { list: 'bullet' },
              'code-block',
            ],
          ],
        }}
        {...rest}
      />
      <div className="sound-recorder-wrapper">
        {isRecordable && (
          <Button
            type="link"
            icon={<MicIcon width={15} fill="#fff" />}
            shape="circle"
            className="btn-record"
            // onClick={() => setIsSoundPopup(true)}
            disabled={isRecording}
            onClick={onRecord}
          />
        )}

        {isSoundPopup && (
          <div className="popup-wrapper">
            <SoundRecordPopup
              onFinish={confirmRecord}
              onCancel={stopRecord}
              length={format()}
            />
          </div>
        )}
      </div>

      {record?.url && (
        <div className="record">
          <audio src={record?.url} controls />
          <DeleteIcon
            onClick={() => setRecord(false)}
            style={{ marginLeft: '7px' }}
          />
        </div>
      )}
    </div>
  );
}

export default OwnTextEditor;

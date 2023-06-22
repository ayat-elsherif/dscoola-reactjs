import { css } from '@emotion/css';
import { Button, Form, Input, message } from 'antd';
import useQAndAAdd from 'api-hooks/Q&A/useQAndAAdd';
import useQAndAUpd from 'api-hooks/Q&A/useQAndAUpd';
import OwnModal from 'components/own/OwnModal';
import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';
import useS3Upload from 'Hooks/utils/useS3Upload';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { isTextEditorValue } from 'utils';
import ModalConfirm from './ModalConfirm';

function ModalCrsQuestion({ open, setOpen, editQues }) {
  // // console.log('ModalCrsQuestion  editQues', editQues);
  const ModalCrsQuestionStyles = css`
    .form {
      label {
        font-weight: 400;
        font-size: 1.5rem;
      }
      input {
        width: 100%;
        height: 4.5rem;
      }

      .btn-publish {
        margin-left: auto;
      }
    }
  `;

  const params = useParams();
  // // console.log('ModalCrsQuestion  params', params);
  const { s3Upload } = useS3Upload();

  const [textEdit, setTextEdit] = useState(
    editQues ? editQues?.description : '',
  );
  const [record, setRecord] = useState(
    editQues ? { url: editQues?.voice_url } : null,
  );

  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const { QAndAAdd, QAndAAddLod } = useQAndAAdd();
  const { QAndAUpd, QAndAUpdLod } = useQAndAUpd();

  const onSuc = () => {
    setOpen(false);
    setIsModalConfirmOpen(true);
    setRecord(null);
  };
  const onFinish = async (values) => {
    // console.log('onFinish  values', values);
    const description = isTextEditorValue(textEdit);
    if (!description && !record?.file)
      return message.warning('Please add your question');

    let file = null;
    if (record?.file) {
      file = await s3Upload(record?.file);
      // console.log('onAddComment  file', file);
    }

    const reqData = {
      ...values,
      course_id: params?.course_id,
      description,
      voice_url: file,
    };
    if (!reqData?.voice_url) delete reqData?.voice_url;

    // // console.log('onFinish  reqData', reqData);
    if (editQues) {
      reqData.questionId = editQues?.id;
      QAndAUpd({ reqData, onSuc });
    } else {
      QAndAAdd({ reqData, onSuc });
    }
    return {};
  };
  return (
    <>
      <OwnModal
        open={open}
        onCancel={() => setOpen(false)}
        title={editQues ? 'Edit Questions' : 'Ask Questions'}
        width={508}
        className={ModalCrsQuestionStyles}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="form"
          initialValues={{ title: editQues ? editQues?.title : '' }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input
              placeholder="Enter your title"
              // initialValues={editQues ? editQues?.title : ''}
            />
          </Form.Item>
          <Form.Item label="your question">
            <OwnTextEditor
              textEdit={textEdit}
              setTextEdit={setTextEdit}
              record={record}
              setRecord={setRecord}
              placeholder="Enter your question"
              modal
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-publish"
            loading={QAndAAddLod || QAndAUpdLod}
          >
            {editQues ? 'Update' : 'Publish'}
          </Button>
        </Form>
      </OwnModal>
      <ModalConfirm
        open={isModalConfirmOpen}
        onOk={() => setIsModalConfirmOpen(false)}
        title="Done!"
        subTitle={`Your Questions has been successfully ${
          editQues ? 'Updated' : 'Published'
        }`}
      />
    </>
  );
}

export default ModalCrsQuestion;

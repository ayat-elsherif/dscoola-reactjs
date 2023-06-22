import { css } from '@emotion/css';
import { Button, Form, Input } from 'antd';
import useAnnounAdd from 'api-hooks/announcement/useAnnounAdd';
import useAnnounUpd from 'api-hooks/announcement/useAnnounUpd';
import OwnModal from 'components/own/OwnModal';
import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalConfirm from './ModalConfirm';

function ModalAnnouncement({ open, setOpen, editAnnoun }) {
  // console.log('ModalAnnouncement  editAnnoun', editAnnoun);
  const ModalAnnouncementStyles = css`
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
  // console.log('ModalAnnouncement  params', params);

  const [textEdit, setTextEdit] = useState(
    editAnnoun ? editAnnoun?.description : '',
  );
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const { announAdd, announAddLod } = useAnnounAdd();
  const { announUpd, announUpdLod } = useAnnounUpd();

  const onSuc = () => {
    setOpen(false);
    setIsModalConfirmOpen(true);
  };
  const onFinish = (values) => {
    // console.log('HeaderWrapper  searchQueryObj', searchQueryObj);
    // console.log('HeaderWrapper  textEdit', textEdit);
    const reqData = {
      ...values,
      course_id: params?.course_id,
      description: textEdit,
      // voice_url: '',
    };
    // console.log('onFinish  reqData', reqData);
    if (editAnnoun) {
      reqData.announId = editAnnoun?.id;
      announUpd({ reqData, onSuc });
    } else {
      announAdd({ reqData, onSuc });
    }
    return {};
  };
  return (
    <>
      <OwnModal
        open={open}
        onCancel={() => setOpen(false)}
        title={editAnnoun ? 'Edit announcement' : 'Add announcement'}
        width={508}
        className={ModalAnnouncementStyles}
      >
        <Form onFinish={onFinish} layout="vertical" className="form">
          <Form.Item name="title" label="Title">
            <Input
              placeholder="Enter your title"
              initialValues={editAnnoun ? editAnnoun?.title : ''}
            />
          </Form.Item>
          <Form.Item label="your announcement">
            <OwnTextEditor
              textEdit={textEdit}
              setTextEdit={setTextEdit}
              placeholder="Enter your announcement"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-publish"
            loading={announAddLod || announUpdLod}
          >
            {editAnnoun ? 'Update' : 'Publish'}
          </Button>
        </Form>
      </OwnModal>
      <ModalConfirm
        open={isModalConfirmOpen}
        onOk={() => setIsModalConfirmOpen(false)}
        title="Done!"
        subTitle={`Your Announcement has been successfully ${
          editAnnoun ? 'Updated' : 'Published'
        }`}
      />
    </>
  );
}

export default ModalAnnouncement;

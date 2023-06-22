import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { DeleteModalIcon } from '../../../../../assets/svg';
import DashboardButton from '../../../../../components/common/dashboard/components/button';
import DeleteModal from './deleteModal';
import { useDeleteCourse } from './hooks/useDeleteCourses';
import { useQueryClient } from '@tanstack/react-query';
import SweetAlert from '../../../../../components/common/dashboard/components/sweetAlert.js';

const DeleteConfirm = ({ isOpen, cancel, id }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const onDeleteSuccess = (data) => {
    console.log('dae', data);
    SweetAlert(
      'Thank You!',
      'We will review your reason for delete and you will be notified when it is finished. Please wait for the email',
      '/assets/images/message.png',
    );
    queryClient.invalidateQueries('insructor-courses');
  };
  const onDeleteFail = (data) => {
    console.log('dae', data);
  };
  const { mutate: deleteCourse, isLoading } = useDeleteCourse(
    onDeleteSuccess,
    onDeleteFail,
  );
  const onDelete = () => {
    // setOpen(true);
    deleteCourse(id.id);
    cancel();
  };
  const onCancel = () => {
    cancel();
  };

  return (
    <>
      <Modal
        centered
        closable={false}
        open={isOpen}
        onCancel={cancel}
        footer={null}
        className="delete-modal"
        width="440px"
      >
        <div className="delete-modal_header">
          <DeleteModalIcon />
          <h3>Are You Sure ?</h3>
          <p>You Want To Delete This Course</p>
        </div>

        <Row justify="center" gutter={[16]}>
          <Col>
            <Button onClick={onCancel}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onDelete}>
              Delete
            </Button>
          </Col>
          {/* <DashboardButton
            text="Cancel"
            btnClass="btn-modal gray-btn"
            onclick={onCancel}
            type="link"
          />
          <DashboardButton
            text="Delete"
            btnClass="btn-modal"
            onclick={onDelete}
            type="link"
            cssStyle={{ marginLeft: '14px' }}
          /> */}
        </Row>
      </Modal>
      <DeleteModal isOpen={open} cancel={() => setOpen(false)} />
    </>
  );
};

export default DeleteConfirm;

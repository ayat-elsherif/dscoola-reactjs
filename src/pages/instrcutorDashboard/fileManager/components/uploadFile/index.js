/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDropzone } from 'react-dropzone';

import DashboardButton from '../../../../../components/common/dashboard/components/button';
import './index.scss';
import { Closecon, DragFileIcon, TrashIcon } from '../../../../../assets/svg';

const UploadFile = ({ isOpen, cancel }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const deleteFile = () => {
    setFiles([]);
  };

  const thumbs = files?.map((file) => (
    <div key={file?.name} className="thumbs">
      <div>
        {' '}
        <img
          src={file?.preview}
          alt={file?.name}
          onLoad={() => {
            URL.revokeObjectURL(file?.preview);
          }}
        />
        <span>{file?.name}</span>
      </div>
      <TrashIcon onClick={deleteFile} />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file?.preview));
  }, []);
  const onsubmit = () => {};

  return (
    <Modal
      centered
      closeIcon={<Closecon />}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="upload-file-modal"
      width="492px"
    >
      <h3>Upload File</h3>

      <div className="drag-file">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <DragFileIcon />

          <p>
            Drag and drop <span>file here or</span> browse
          </p>
        </div>
      </div>

      <div className="uploades-conatiner">
        <h3>Upload Files</h3> {files.length > 0 ? thumbs : null}
      </div>

      <DashboardButton
        text="Add Files"
        btnClass="btn-modal"
        onclick={onsubmit}
        type="link"
        cssStyle={{ height: '40px', width: '100%' }}
      />
    </Modal>
  );
};

export default UploadFile;

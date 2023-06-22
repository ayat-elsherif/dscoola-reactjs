import React, { useState } from 'react';

import './shareGroup.scss';
import { colorfulShareIcon } from '../../pages/courses/SVGs';

import ModalShareCourse from 'components/modals/ModalShareCourse';

function ShareGroup({ shareLabel }) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="shareGroup">
      <div className="shareGroup-toggle" onClick={() => handleOpen()}>
        {colorfulShareIcon} {shareLabel}
      </div>
      <ModalShareCourse
        open={show}
        onCancel={() => {
          handleClose(setShow);
        }}
        title="Share This Course"
      />
    </div>
  );
}

export default ShareGroup;

import React, { useState } from 'react';
import OwnModal from 'components/own/OwnModal';
import { Skeleton } from 'antd';

import VideoJsPlayer from '../../../helpers/Video';
import { playVideo } from '../SVGs';
function VideoSidebar({ myCourse, isLoading }) {
  const [openVideo, setOpenVideo] = useState(false);
  const handleClose = (handleModal) => handleModal(false);
  const handleShow = (handleModal) => handleModal(true);
  const videoObj = {
    videoUrl: myCourse?.course?.videoPreviewUrl?.video_src,
    videoType: 'video/' + myCourse?.course?.videoPreviewUrl?.type,
  };
  return (
    <>
      <OwnModal
        open={openVideo}
        onCancel={() => {
          handleClose(setOpenVideo);
        }}
        className="courseBrief"
        extraClass={'oneonone-modal'}
      >
        <VideoJsPlayer videoObj={videoObj} />
      </OwnModal>
      <div
        className="videoLoading"
        onClick={() => {
          handleShow(setOpenVideo);
        }}
      >
        {isLoading ? (
          <Skeleton.Image className="cart-image-loadin" active />
        ) : (
          <>
            {playVideo}
            <img
              src={myCourse?.course?.thumbnailurl}
              alt=""
              className="cartsidebar-video"
            />
          </>
        )}
      </div>
    </>
  );
}

export default VideoSidebar;

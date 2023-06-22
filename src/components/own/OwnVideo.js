import React, { useState } from 'react'
import play_w from 'assets/images/own/vid-play-w.svg'
import pause_w from 'assets/images/own/vid-pause-w.svg'
import cls from 'classnames'
import ReactPlayer from 'react-player'
import { css } from '@emotion/css'

function OwnVideo({
  url,
  controls,
  height,
  width,
  icon,
  muted,
  onplay,
  playing,
  ...rest
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const OwnVideoStyles = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding-top: 56.25%; */
    /* .react-player {
      position: absolute;
      top: 0;
      left: 0;
    } */
    img {
      width: 6rem;
      position: absolute;
      cursor: pointer;
      display: ${playing && isVideoPlaying ? 'none' : 'inherit'};
    }
  `
  return (
    <div className={OwnVideoStyles}>
      <ReactPlayer
        url={url}
        playing={playing && isVideoPlaying}
        muted={muted}
        controls={controls && isVideoPlaying}
        height={height}
        width={width}
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
        // light={true}
        className="react-player"
        {...rest}
      />
      <img
        src={icon || play_w}
        onClick={() => {
          setIsVideoPlaying(true)
          onplay()
        }}
        title="play video"
        alt="play video"
      />
    </div>
  )
}

export default OwnVideo

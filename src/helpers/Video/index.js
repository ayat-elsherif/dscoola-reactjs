import { useEffect, useRef, useState } from 'react';
import VideoJS from '../../components/Videojs';
import '/node_modules/videojs-youtube/dist/Youtube.js';
import '/node_modules/videojs-hotkeys/videojs.hotkeys.min.js';
import '/node_modules/videojs-seek-buttons/dist/videojs-seek-buttons.css';
import '/node_modules/videojs-seek-buttons/dist/videojs-seek-buttons.min.js';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

const VideoJsPlayer = ({ videoObj, activesection }) => {
  // window.scrollTo(0, 0);
  const { course_id, lecture_id, course_slug } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [nextLecId, setNextLecId] = useState();

  useEffect(() => {
    setNextLecId(
      activesection?.lectures?.indexOf(
        activesection?.lectures.find((i) => i.id === +lecture_id),
      ),
    );
  }, [activesection, lecture_id]);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],

    plugins: {
      hotkeys: {
        volumeStep: 0.1,
        seekStep: 3,
        enableModifiersForNumbers: false,
        playPauseKey: function (event, player) {
          // override playpause key to trigger when pressing the X key or space
          return event.which === 88;
        },
        muteKey: function (event, player) {
          // override muteKey to trigger when pressing M key
          return event.which === 88;
        },
      },
      seekButtons: {
        forward: 10,
        back: 10,
      },
    },
    poster: '/assets/images/events/group3.jpg',

    sources: [
      {
        src: videoObj?.videoUrl,
        type: videoObj?.videoUrl?.includes('youtube')
          ? 'video/youtube'
          : videoObj?.videoType || 'video/youtube',
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.hotkeys({
      volumeStep: 0.1,
      seekStep: 5,
      enableModifiersForNumbers: false,
    });
    // player.on("ready", () => {
    //   player.requestPictureInPicture().catch((e) => {
    //     console.log(e, "i'm the error");
    //   });
    // });
    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });

    player.on('ended', function () {
      console.log({ player, sss: ' endeeeeed' });
      message.success('Up To The Next Lecture').then(() => {
        // TODO SEND COMPLETE LECTURE REQUEST
        if (nextLecId !== -1) {
          navigate(
            `/course/${course_slug}/${course_id}/section/${
              activesection?.id
            }/preview/${+lecture_id + 1}`,
          );
        }
      });
    });
  };

  return (
    <div className="container p-0 scoola-video">
      {
        <VideoJS
          options={videoJsOptions}
          onReady={handlePlayerReady}
          // videoPosition={videoPosition}
        />
      }
    </div>
  );
};

export default VideoJsPlayer;

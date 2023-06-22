import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Video from 'twilio-video';
import {
  CamaraIcon,
  CamDisabledIcon,
  MicDisabledIcon,
  MicIcon,
  SharediabledIcon,
  SharescreenIcon,
} from '../../assets/svg';
import ChatServices from '../../services/ChatServices';

import Participant from './Participant';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [localVideoTracks, setLocalVideoTracks] = useState(null);
  const [localAudioTracks, setLocalAudioTracks] = useState(null);
  const [screenTrack, setScreenTrack] = useState(null);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const chatData = useSelector((s) => s.chatData);
  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
      Video.createLocalTracks({
        audio: { name: 'microphone' },
        video: { name: 'camera' },
      }).then(function (localTracks) {
        localTracks.forEach(function (localTrack) {});
        setLocalVideoTracks(localTracks[1]);
        setLocalAudioTracks(localTracks[0]);
      });
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => {
    return <Participant key={participant.sid} participant={participant} />;
  });
  const handlashareScreen = () => {
    if (!screenTrack) {
      navigator.mediaDevices
        .getDisplayMedia({ video: { frameRate: 15 } })
        .then((stream) => {
          const screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
          setScreenTrack(screenTrack);
          setShareScreen(true);
          room.localParticipant.publishTrack(screenTrack);
        });
    } else {
      room.localParticipant.unpublishTrack(screenTrack);
      screenTrack.stop();
      setScreenTrack(null);
      setShareScreen(false);
    }
  };

  const toogleCam = (e) => {
    e.preventDefault();

    if (localVideoTracks?.isEnabled) {
      room.localParticipant.videoTracks.forEach(function (track) {
        track.track.disable();
        setLocalVideoTracks(track.track);
        setCam(false);
      });
    } else if (!localVideoTracks?.isEnabled) {
      room.localParticipant.videoTracks.forEach(function (track) {
        track.track.enable();
        setLocalVideoTracks(track.track);
        setCam(true);
      });
    }
  };
  const toogleMic = (e) => {
    e.preventDefault();
    if (localAudioTracks?.isEnabled) {
      room.localParticipant.audioTracks.forEach(async function (track) {
        track.track.disable();
        await setLocalAudioTracks(track.track);

        setMic(false);
      });
    } else if (!localAudioTracks?.isEnabled) {
      room.localParticipant.audioTracks.forEach(async function (track) {
        track.track.enable();
        await setLocalAudioTracks(track.track);

        setMic(true);
      });
    }
  };

  const logOut = async () => {
    await room.localParticipant.tracks.forEach((publication) => {
      publication.track.stop();
      const attachedElements = publication.track.detach();
      attachedElements.forEach((element) => element.remove());
    });
    // To disconnect from a Room
    room.disconnect();
    ChatServices.changeStatus(chatData.id)
      .then(() => {
        handleLogout();
        setRoom(undefined);
        setLocalVideoTracks(null);
        setLocalAudioTracks(null);
        setScreenTrack(null);
        setRoom(null);
      })
      .catch(() => {
        handleLogout();
        setRoom(undefined);
        setLocalVideoTracks(null);
        setLocalAudioTracks(null);
        setScreenTrack(null);
        setRoom(null);
      });
  };

  return (
    <div className='room'>
      <div>
        <div className='local-participant'>
          {room ? (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          ) : (
            ''
          )}
        </div>

        <div className='remote-participants'>
          {remoteParticipants[remoteParticipants.length - 1]}
        </div>
      </div>
      <div className='controles'>
        {' '}
        <div>
          <button onClick={toogleCam} className='controle-rooom'>
            {cam === true ? <CamaraIcon /> : <CamDisabledIcon />}
          </button>
          <button onClick={toogleMic} className='controle-rooom'>
            {mic === true ? <MicIcon /> : <MicDisabledIcon />}
          </button>
          <button onClick={handlashareScreen} className='controle-rooom'>
            {!shareScreen ? <SharescreenIcon /> : <SharediabledIcon />}
          </button>
        </div>
        <div>
          {' '}
          <button onClick={logOut} className='leave-room'>
            Leave meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;

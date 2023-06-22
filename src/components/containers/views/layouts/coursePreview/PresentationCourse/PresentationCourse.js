import VideoJsPlayer from 'helpers/Video';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Quiz from '../newQuiz';
import ZoomSDK from '../ZoomSDK';
import logo from '../../../../../../logo.svg';
import { ArticleView } from './Article';

function PresentationCourse({ courseContent, showCourse }) {
  let { lecture_id } = useParams();
  const [activeLecture, setActiveLecture] = useState();
  const [activesection, setActiveSection] = useState();

  useEffect(() => {
    courseContent?.sections?.forEach((item, idx) => {
      const currentLec = item?.lectures.find((i) => i.id === +lecture_id);

      if (currentLec) {
        setActiveLecture(currentLec);
        setActiveSection(item);
        return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lecture_id, courseContent]);

  if (!activeLecture)
    return (
      <div className="defaultCourePreview">
        <img src={logo} alt={'scoola'} />
      </div>
    );

  const { video_src, videoUrl } = activeLecture?.items?.video;

  return (
    <div id="video-height-wrapper" className="video-presentation-wrapper">
      <div>
        {activeLecture?.type === 'video' && (
          <div id="video-presentation-container">
            <VideoJsPlayer
              videoObj={{
                videoUrl: videoUrl || video_src?.video_src,
                videoType: video_src?.video_type,
              }}
              activesection={activesection}
            />
          </div>
        )}

        {activeLecture?.type === 'quiz' && (
          <Quiz
            activesection={activesection}
            quizId={activeLecture?.items?.quiz?.id}
          />
        )}

        {activeLecture?.type === 'artical' && (
          <ArticleView url={activeLecture?.items?.artical?.resourceUrl} />
        )}

        {activeLecture?.type === 'livesession' && (
          <>
            <div className="videoslide-container">
              <ZoomSDK
                zoomObj={{ ...activeLecture?.items?.zoomMeeting, role: 0 }}
              />
            </div>
            <div className="defaultCourePreview">
              <img src={logo} alt={'scoola'} />
            </div>
          </>
        )}

        {activeLecture?.type === 'videoslide' && (
          <div className="videoslide-container">
            <VideoJsPlayer
              videoObj={activeLecture?.items?.video}
              activesection={activesection}
            />

            <ArticleView url={activeLecture?.items?.slide?.resourceUrl} />
          </div>
        )}

        {!activeLecture?.type ? (
          <div className="defaultCourePreview">
            <img src={logo} alt={'scoola'} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PresentationCourse;

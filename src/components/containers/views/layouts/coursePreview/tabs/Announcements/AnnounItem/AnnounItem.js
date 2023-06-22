import { css } from '@emotion/css';
import { Button, Col, Row, Skeleton } from 'antd';
import useAnnounDel from 'api-hooks/announcement/useAnnounDel';
import { EditIcon, ReplyIcon, TrashIcon } from 'assets/svg';
import ModalAnnouncement from 'components/modals/ModalAnnouncement';
import UserAvatar from 'components/tiny/UserAvatar';
import dayjs from 'dayjs';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { limitedText } from 'utils';

function AnnounItem({ announ, borderLess, loading }) {
  // console.log('AnnounItem  announ', announ);
  const AnnounItemStyles = css`
    padding: 2rem 0;
    border-top: ${borderLess ? 'none' : '1px solid #e0e0f5'};

    .content-wrapper {
      .header {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        margin-bottom: 0.5rem;
        .title {
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 1.9rem;
          color: #2a2a2a;
          max-inline-size: 45ch;
        }
        .btns-wrapper {
          display: flex;
          align-items: center;
          gap: 1.4rem;

          button {
            min-width: auto;
            min-height: auto;
            height: auto;
            width: auto;
            svg {
              width: 1.4rem;
              height: 1.4rem;
            }
          }
        }
      }
      .desc {
        font-size: 1.5rem;
        line-height: 2.5rem;
        color: #6a6f73;
        max-inline-size: 45ch;
        margin-bottom: 0.5rem;
      }
      .footer {
        .info-wrapper {
          a {
          }
          span {
          }
        }
        .btn-reply {
          min-width: auto;
          min-height: auto;
          height: auto;
          width: auto;
          padding: 0;
          svg {
            width: 1.6rem;
            margin-inline-end: 0.6rem;
          }
          font-size: 1.4rem;
          color: #9b9c9d;
        }
      }
    }
  `;
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((s) => s?.user);

  const { searchQueryStr } = useSearchQuery();
  const { announDel, announDelLod } = useAnnounDel();
  const [isModalAnnounOpen, setIsModalAnnounOpen] = useState(false);

  const onQAndADel = () => {
    announDel({ announId: announ?.id });
  };

  if (loading || announDelLod)
    return <AnnounItemLoading borderLess={borderLess} />;
  return (
    <>
      <div className={AnnounItemStyles}>
        <Row gutter={10} wrap={false}>
          <Col>
            <UserAvatar img={announ?.commenter?.photo_url} />
          </Col>
          <Col flex="auto">
            <div className="content-wrapper">
              <div className="header">
                <div className="title">{announ?.title}</div>
                <div className="btns-wrapper">
                  <Button
                    type="link"
                    icon={<EditIcon />}
                    onClick={() => setIsModalAnnounOpen(true)}
                  />
                  <Button
                    type="link"
                    icon={<TrashIcon />}
                    loading={announDelLod}
                    onClick={onQAndADel}
                  />
                </div>
              </div>
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: limitedText(announ?.description, 50),
                }}
              />
              {/* {announ?.voice_url && (
                <audio src={announ?.voice_url} controls>
                  Your browser does not support the audio element.
                </audio>
              )} */}
              <div className="footer">
                <Row gutter={30} justify="space-between">
                  <Col>
                    <div className="info-wrapper">
                      <Link to={``}>{announ?.commenter?.name || '??'}</Link> .{' '}
                      <span>{dayjs(announ?.created_at).fromNow()}</span>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      type="link"
                      icon={<ReplyIcon />}
                      className="btn-reply"
                      onClick={() =>
                        navigate(
                          `/course/${params?.course_slug}/${params?.course_id}/section/${params?.section_id}/preview/${params?.lecture_id}/announcements?id=${announ?.id}&type=App\\Announcement`,
                        )
                      }
                    >
                      {announ?.reply_count || '??'} reply
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ModalAnnouncement
        open={isModalAnnounOpen}
        setOpen={setIsModalAnnounOpen}
        editAnnoun={announ}
      />
    </>
  );
}

export default AnnounItem;

export function AnnounItemLoading({ borderLess }) {
  const AnnounItemLoadingStyles = css`
    padding: 2rem 0;
    border-top: ${borderLess ? 'none' : '1px solid #e0e0f5'};
    .content-wrapper {
      .header {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        margin-bottom: 1.4rem;
        .sk-title {
          max-inline-size: 35ch;
          h3 {
            height: 2.5rem;
          }
        }

        .btns-wrapper {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          .sk-btn {
            span {
              min-width: auto;
              width: 2.5rem;
              height: 2.5rem;
            }
          }
        }
      }

      .sk-text {
        max-inline-size: 60ch;

        .ant-skeleton-paragraph > li + li {
          margin-block-start: 8px;
        }
      }
    }
  `;

  return (
    <div className={AnnounItemLoadingStyles}>
      <Row gutter={10} wrap={false}>
        <Col>
          <Skeleton.Avatar active />
        </Col>
        <Col flex="auto">
          <div className="content-wrapper">
            <div className="header">
              <Skeleton active paragraph={false} className="sk-title" />
              <div className="btns-wrapper">
                <Skeleton.Button className="sk-btn" />
                <Skeleton.Button className="sk-btn" />
              </div>
            </div>

            <Skeleton title={false} className="sk-text" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

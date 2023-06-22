import { css } from '@emotion/css';
import { Button, Skeleton, Tabs } from 'antd';
import useProfileStudent from 'api-hooks/profile/useProfileStudent';
import useYallaOnlineMyGroups from 'api-hooks/yalla-online/useYallaOnlineMyGroups';
import { ArrowDownIcon } from 'assets/svg';
import YallaOnlineCards from 'components/YallaOnlineCards/YallaOnlineCards';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function StudentPage() {
  const StudentPageStyles = css`
    .page-header {
      padding: 2.7rem 0;
      border-bottom: 1px solid #cccccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2.3rem;

      .lead {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2rem;
        text-transform: capitalize;
        color: #6a6f73;
      }
      .big {
        font-weight: 500;
        font-size: 2rem;
        line-height: 2rem;
        text-transform: capitalize;
        color: #2a2a2a;
      }
      .profile-info {
        min-width: 40rem;
        display: flex;
        align-items: center;
        gap: 2.3rem;

        .sk-img {
          span {
            width: 14.3rem !important;
            height: 14.3rem !important;
          }
        }
        .image-wrapper {
          width: 14.3rem;
          height: 14.3rem;
          overflow: hidden;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          .name {
            font-size: 2.2rem;
          }
        }
      }
      ul.num-list {
        display: flex;
        align-items: center;
        gap: 10rem;
        li {
          .lead {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
          }
        }
      }
    }
    .user-bio {
      padding: 3.5rem 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
      .title {
        font-weight: 500;
        font-size: 2rem;
        line-height: 1.9rem;
        text-transform: capitalize;
        color: #2a2a2a;
      }
      .desc {
        font-size: 1.4rem;
        line-height: 2.5rem;
        color: #2a2a2a;
      }
      .btn-show-more {
        /* margin-bottom: 2rem; */
        padding: 0;
        display: flex;
        flex-direction: row-reverse;

        gap: 1rem;
        font-size: 1.4rem;
        svg {
          width: 0.9rem;
          path {
            fill: #7e59d1;
          }
        }
      }
    }
    .tabs-wrapper {
      margin-bottom: 6rem;
      .tabs {
        > .ant-tabs-nav {
          /* &::before {
            display: none;
          } */

          color: #6a6f73;
          .ant-tabs-tab {
            font-weight: 500;
            font-size: 1.5rem;
            line-height: 2.4rem;
            text-transform: capitalize;

            &.ant-tabs-tab-active {
              .ant-tabs-tab-btn {
                color: #2a2a2a;
              }
            }
          }

          .ant-tabs-ink-bar {
            background-color: #7e59d1;
          }
        }
        > .ant-tabs-content-holder {
        }
      }
    }
  `;

  const { student_id } = useParams();

  const { profileStudent, profileStudentLod } = useProfileStudent(student_id);
  console.log('StudentPage  profileStudent:', profileStudent);
  const { yallaOnlineMyGroups, pagination, yallaOnlineMyGroupsLod } =
    useYallaOnlineMyGroups(student_id);

  const items = [
    {
      key: 'my-groups',
      label: `My Groups (${
        yallaOnlineMyGroupsLod ? '...' : yallaOnlineMyGroups?.length
      })`,
      children: (
        <YallaOnlineCards
          list={yallaOnlineMyGroups}
          pagination={pagination}
          loading={yallaOnlineMyGroupsLod}
        />
      ),
    },
  ];

  const { tab: activeTab } = useParams();
  // console.log('CoursePreview  activeTab', tab || activeTab || 'course-content');
  const [isAllBio, setIsAllBio] = useState(false);
  const handleTabChange = (key) => {
    // navigate(
    //   `/course/${slug?.course_slug}/${slug?.course_id}/section/${slug?.section_id}/preview/${slug?.lecture_id}/${key}`,
    // );
  };
  return (
    <div className={StudentPageStyles}>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <div className="profile-info">
              {profileStudentLod ? (
                <>
                  <Skeleton.Avatar className="sk-img" />
                  <Skeleton paragraph={{ rows: 2 }} active />
                </>
              ) : (
                <>
                  <div className="image-wrapper">
                    <img src={profileStudent?.photo_url} alt="" />
                  </div>
                  <div className="text-wrapper">
                    <div className="lead">Student</div>
                    <div className="big name">{profileStudent?.name}</div>
                    <div className="lead">{profileStudent?.job_title}</div>
                  </div>
                </>
              )}
            </div>
            <ul className="num-list">
              <li>
                <div className="lead">Enrolled Courses</div>
                <div className="big">
                  {profileStudentLod ? '...' : profileStudent?.yalla_counts}
                </div>
              </li>
              <li>
                <div className="lead">Groups</div>
                <div className="big">
                  {profileStudentLod ? '...' : profileStudent?.enroll_counts}
                  {/* {yallaOnlineMyGroupsLod ? '...' : yallaOnlineMyGroups?.length} */}
                </div>
              </li>
            </ul>
          </div>
          <div className="user-bio">
            <div className="title">bio</div>
            <div className="desc">
              {profileStudent?.about_me
                ? isAllBio
                  ? profileStudent?.about_me
                  : profileStudent?.about_me?.substring(0, 1800)
                : 'No bio yet!'}
            </div>
            {!isAllBio && profileStudent?.about_me?.length > 1800 && (
              <Button
                type="link"
                icon={<ArrowDownIcon />}
                className="btn-show-more"
                onClick={() => setIsAllBio(true)}
              >
                Show more
              </Button>
            )}
          </div>
          <div className="tabs-wrapper">
            <Tabs
              items={items}
              activeKey={activeTab || 'my-groups'}
              onChange={handleTabChange}
              tabBarGutter={20}
              className="tabs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;

import { css } from '@emotion/css';
import { Tabs } from 'antd';
import CoursesSliderWrapper from 'components/CoursesSliderWrapper/CoursesSliderWrapper';
import { camelToNrm } from 'utils';
import SectionHeader from '../SectionHeader';

function TopViewed({ data, loading }) {
  // console.log('TopViewed  data', data);
  const TopViewedStyles = css`
    margin: 8rem 0;

    .tabs-wrapper {
      .tabs {
        > .ant-tabs-nav {
          /* &::before {
            display: none;
          } */

          .ant-tabs-tab {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2rem;
            text-transform: capitalize;
            color: #7e7e7e;

            &.ant-tabs-tab-active {
              .ant-tabs-tab-btn {
                font-weight: 500;
                color: #2a2a2a;
              }
            }
          }

          .ant-tabs-ink-bar {
            background-color: #2a2a2a;
          }
        }
        > .ant-tabs-content-holder {
        }
      }
    }
  `;

  const items = Object.entries(data)?.map((el) => {
    const key = el[0];
    const courses = el[1];
    return {
      key,
      label: camelToNrm(key),
      children: <CoursesSliderWrapper courseList={courses} loading={loading} />,
    };
  });

  return (
    <div className={TopViewedStyles}>
      <SectionHeader title="Students are viewing" viewAllLink="topviewed" />
      <div className="tabs-wrapper">
        <Tabs items={items} tabBarGutter={20} className="tabs" />
      </div>
    </div>
  );
}

export default TopViewed;

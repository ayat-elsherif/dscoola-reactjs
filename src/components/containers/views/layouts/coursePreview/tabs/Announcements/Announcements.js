import { css } from '@emotion/css';
import useAnnounList from 'api-hooks/announcement/useAnnounList';
import OwnPagination from 'components/own/OwnPagination';
import OwnResult from 'components/own/OwnResult';
import AnnounPost from './AnnounPost/AnnounPost';

function Announcements() {
  const AnnouncementsStyles = css`
    .tab-title {
      font-weight: 500;
      font-size: 1.8rem;
      color: #6a6f73;
    }
  `;

  const { announList, announListLod, announPagination } = useAnnounList();

  return (
    <div className={AnnouncementsStyles}>
      <div className="tab-wrapper">
        <div className="tab-title">Announcements</div>
        <div className="announcements-wrapper">
          {announListLod ? (
            <AnnounPost loading />
          ) : !!announList?.length ? (
            <>
              {announList?.map((el, i) => (
                <AnnounPost key={el?.id} announ={el} borderLess={i === 0} />
              ))}
              <OwnPagination pagination={announPagination} />
            </>
          ) : (
            <OwnResult
              title="No announcements posted yet."
              extra="The instructor hasn’t added any announcements to this course yet. Announcements are used to inform you of updates or additions to the course."
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcements;

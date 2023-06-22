import { css } from '@emotion/css';
import useYallaOnlineList from 'api-hooks/yalla-online/useYallaOnlineList';
import YallaOnlineCards from 'components/YallaOnlineCards/YallaOnlineCards';
import HeaderWrapper from './HeaderWrapper';

function YallaOnline() {
  const YallaOnlineStyles = css`
    .yalla-online-wrapper {
      padding: 3.5rem 0;
    }
  `;

  const { yallaOnlineList, yallaOnlineListLod, yallaOnlinePagination } =
    useYallaOnlineList();
  // console.log('YallaOnline  yallaOnlineList', yallaOnlineList);
  return (
    <div className={YallaOnlineStyles}>
      <div className="tab-wrapper">
        <HeaderWrapper />
        <YallaOnlineCards
          list={yallaOnlineList}
          pagination={yallaOnlinePagination}
          loading={yallaOnlineListLod}
        />
      </div>
    </div>
  );
}

export default YallaOnline;

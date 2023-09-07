import React from 'react';
import './viewAllTitle.scss';
import LeftArrow from '../../../../assets/svg/LeftArrow';
import CartBlueIcon from '../../../../assets/svg/CartBlueIcon';
import { Link } from 'react-router-dom';
import Close from '../../../../assets/svg/Close';
// import Searchbar from '../home/searchbarAndNotifications/searchbar/Searchbar';
import FilterBlueIcon from '../../../../assets/svg/FilterBlueIcon';
// import { useRouter } from 'next/router';
export default function ViewAllTitle({
  title,
  noCartIcon,
  isCloseButton,
  url,
  // searchBar,
  filter,
  isSearchResult,
}) {
  // const router = useRouter();
  return (
    <>
      <div
        className={`all-title-container container ${
          isSearchResult && 'search-result'
        }`}
      >
        <div className="view-all-section">
          {url ? (
            <Link href={url}>{isCloseButton ? <Close /> : <LeftArrow />}</Link>
          ) : (
            <span
              style={{ cursor: 'pointer' }}
              //  onClick={() => router.back()}
            >
              {isCloseButton ? <Close /> : <LeftArrow />}
            </span>
          )}
          <h2 className={'viewall-title'}>{title}</h2>
          <span>{!noCartIcon && <CartBlueIcon />}</span>
        </div>
        <div className="search-section">
          {/* {searchBar ? <Searchbar /> : ''} */}

          {filter ? (
            <div className="filter-icon">
              <FilterBlueIcon />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

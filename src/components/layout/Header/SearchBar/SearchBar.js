// import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useQParam } from 'Hooks/useQParam';
// import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { SearchBox } from 'react-instantsearch-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function SearchBar() {
  const location = useLocation();
  const SearchBarStyles = css`
    max-width: 39.4rem;
  `;
  const paramTitle = useParams();
  const searchBy = useQParam('search-by');
  const navigate = useNavigate();
  const Location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const onSearchSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (location?.pathname?.includes('/rythm')) return;
    if (location?.pathname?.includes('/webinars'))
      navigate(`/webinars?title=*${searchValue}*`);
    else navigate(`/searchresult?search-by=${searchValue}`);
  };

  useEffect(() => {
    setSearchValue('');
  }, [Location?.pathname]);

  return (
    <div className={SearchBarStyles}>
      {/* <Input
        size="large"
        placeholder="Search for anything"
        prefix={<SearchOutlined />}
        className="search-input"
        bordered={false}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (e.keyCode === 13) {
            onSearchSubmit();
          }
        }}
        onPressEnter={onSearchSubmit}
      /> */}
      <SearchBox
        onSubmit={onSearchSubmit}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (
            location?.pathname?.includes('searchresult') ||
            location?.pathname?.includes('rythm')
          )
            navigate({ search: `search-by=${e.target.value}` });
        }}
        defaultRefinement={searchBy || ''}
      />
    </div>
  );
}

export default SearchBar;

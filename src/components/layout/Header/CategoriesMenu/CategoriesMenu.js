import { Dropdown, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, injectGlobal } from '@emotion/css';
import { ArrowIcon } from 'assets/svg';
import useCategoryIndex from 'api-hooks/category/useCategoryIndex';

// FOR STYLE UTILS
const menuDimensions = {
  width: '26rem',
  minHeight: '64rem',
  boxShadow: 'none',
};

const menuIds = [];
const getMenuIds = () =>
  menuIds.forEach((id) => {
    injectGlobal`
  ul[id*="${id}"]{
    width: ${menuDimensions.width};
    min-height: ${menuDimensions.minHeight};
    margin-inline-start: -.6rem;
    box-shadow: none !important;

    .ant-dropdown-menu-submenu-title {
      display: flex;
      align-items: center;
    }
  }
`;
  });
// =====================

const placeholder = [
  { key: 1, label: <Skeleton paragraph={{ rows: 14, width: '100%' }} /> },
];

// START
function CategoriesMenu() {
  const menuStyle = css`
    box-shadow: none !important;

    .ant-dropdown-menu-submenu-title {
      display: flex;
      align-items: center;
    }
  `;

  const { categoryIndex, categoryIndexLod } = useCategoryIndex();
  // console.log('CategoriesMenu  categoryIndex', categoryIndex);

  useEffect(() => {
    getMenuIds();
  }, [categoryIndex]);

  const navigate = useNavigate();

  const getMenuItems = (item, prevKey) => {
    const key = prevKey + '/' + item?.id + '/' + item?.slug;
    const hasChildren = !!item?.sub_categories?.length;
    if (hasChildren && !menuIds.includes(key)) {
      menuIds.push(key);
    }
    return {
      key,
      label: item?.title,
      children:
        hasChildren &&
        item?.sub_categories?.map((sub) => getMenuItems(sub, key)),
      onTitleClick: hasChildren ? ({ key }) => navigate(key) : undefined,
      onClick: ({ key }) => navigate(key),
    };
  };

  const items = categoryIndex?.map((item) => getMenuItems(item, '/categories'));

  return (
    <Dropdown
      menu={{
        items: items || placeholder,
        style: {
          width: menuDimensions.width,
          minHeight: menuDimensions.minHeight,
        },
        className: menuStyle,
        expandIcon: <ArrowIcon />,
        subMenuCloseDelay: 0.2,
      }}
      arrow
    >
      <span className="category-btn">Categories</span>
    </Dropdown>
  );
}

export default CategoriesMenu;

import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import './index.scss';
import { FilterListIcon } from '../../../../../assets/svg';
const DropDownFilter = ({ menuItems, callback }) => {
  // const [filterValue, setFilterValue] = useState('');
  const menu = (
    <Menu
      onClick={(item) => {
         
        if (item.key == 1) {
          callback(menuItems[+item.key - 1].id);
        }
        if (item.key == 2) {
          callback(menuItems[+item.key - 1].id);
        }
        if (item.key == 3) {
          callback(menuItems[+item.key - 1].id);
        }
      }}
    >
      {menuItems.map((menuItem) => {
        return (
          <Menu.Item key={menuItem.id}>
            <span>{menuItem.title}</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      overlayClassName='filter-dropdown'
      placement='bottomRight'
      trigger={['click']}
      arrow
    >
      <div className='filter-dropdown-button'>
        <FilterListIcon />
        <span>Status</span>
      </div>
    </Dropdown>
  );
};

export default DropDownFilter;

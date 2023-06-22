/* eslint-disable react/jsx-pascal-case */
import React, { memo } from 'react';
import { Tooltip, Avatar } from 'antd';
import Utils from '../../../../../utils';

const Avatar_ = memo(({ elm }) => {
  if (!elm) {
    return <></>;
  }
  return (
    <Tooltip title={elm.name} color='#7E59D1'>
      <div className='member'>
        <Avatar size={43} className={`cursor-pointer `} src={elm.photo_url}>
          {elm.photo_url ? (
            ''
          ) : (
            <span className='text'>{Utils.getNameInitial(elm.name)}</span>
          )}
        </Avatar>
      </div>
    </Tooltip>
  );
});

const ItemMember = memo(({ members }) => {
  return (
    <div className='members'>
      {members?.map((elm, i) =>
        i <= 2 ? <Avatar_ elm={elm} key={i} className={'ml-0'} /> : null
      )}
      {members?.length > 3 ? (
        <Tooltip title={`${members.length - 3} More`} color='#7E59D1'>
          <div className='member'>
            {' '}
            <Avatar
              size={43}
              className='cursor-pointer font-size-sm'
              style={{ backgroundColor: '#7E59D1' }}
            >
              <span className='text'>+{members.length - 3}</span>
            </Avatar>
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
});

export default ItemMember;

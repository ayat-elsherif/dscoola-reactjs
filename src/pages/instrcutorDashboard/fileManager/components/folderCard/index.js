import React from 'react';
import { ExcelIcon, FolderIcon, TxtIcon } from '../../../../../assets/svg';
import { fileTypes } from '../FolderTypes';
import './index.scss';

function FolderCard({ data }) {
  const chooseIcone = (iconType) => {
    if (fileTypes.folder.includes(iconType)) {
      return <FolderIcon />;
    } else if (fileTypes.excel.includes(iconType)) {
      return <ExcelIcon />;
    } else if (fileTypes.text.includes(iconType)) {
      return <TxtIcon />;
    } else {
      return <FolderIcon />;
    }
  };
  return (
    <div className='folder-card'>
      <div className='content'>
        {chooseIcone(data?.type)}
        <h3>{data?.name}</h3>
      </div>
    </div>
  );
}

export default FolderCard;

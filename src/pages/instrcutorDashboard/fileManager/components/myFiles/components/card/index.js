import React from 'react';
import {
  ExcelIcon,
  FolderIcon,
  TxtIcon,
  PDFLargIcon,
  EllipsIcon,
} from '../../../../../../../assets/svg';
import { fileTypes } from '../../../FolderTypes';

import './index.scss';

function MyFileCard({ data }) {
  const chooseIcone = (iconType) => {
    if (fileTypes.folder.includes(iconType)) {
      return <FolderIcon />;
    } else if (fileTypes.excel.includes(iconType)) {
      return <ExcelIcon />;
    } else if (fileTypes.text.includes(iconType)) {
      return <TxtIcon />;
    } else if (fileTypes.pdf.includes(iconType)) {
      return <PDFLargIcon />;
    } else {
      return <FolderIcon />;
    }
  };
  return (
    <div className='myfile-card'>
      <div className='content'>
        {chooseIcone(data?.type)}
        <h3>{data?.name}</h3>
        <div className='date-size'>
          <span>{data?.date}</span>.<span>{data?.size}</span>
        </div>
        <div className='actions'>
          <EllipsIcon />
        </div>
      </div>
    </div>
  );
}

export default MyFileCard;

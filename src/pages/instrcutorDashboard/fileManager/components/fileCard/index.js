import React from 'react';
import {
  ActiveStarredIcon,
  EllipsIcon,
  ExcelIcon,
  FolderIcon,
  PDFIcon,
  TxtIcon,
  ZipIcon,
} from '../../../../../assets/svg';
import { fileTypes } from '../FolderTypes';
import './index.scss';

function FileCard({ data }) {
  const chooseIcone = (iconType) => {
    if (fileTypes.folder.includes(iconType)) {
      return <FolderIcon />;
    } else if (fileTypes.excel.includes(iconType)) {
      return <ExcelIcon />;
    } else if (fileTypes.text.includes(iconType)) {
      return <TxtIcon />;
    } else if (fileTypes.pdf.includes(iconType)) {
      return <PDFIcon />;
    } else if (fileTypes.zip.includes(iconType)) {
      return <ZipIcon />;
    } else {
      return <FolderIcon />;
    }
  };
  return (
    <div className='file-card'>
      {chooseIcone(data?.type)}
      <div className='file-details'>
        <div className='header'>
          <h3>{data?.name}</h3> {data?.starred ? <ActiveStarredIcon /> : null}
        </div>
        <div className='date-size'>
          <span>{data?.date}</span>.<span>{data?.size}</span>
        </div>
      </div>
      <div className='actions'>
        <EllipsIcon />
      </div>
    </div>
  );
}

export default FileCard;

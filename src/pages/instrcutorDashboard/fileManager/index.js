import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import './index.scss';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import { PlusIcon } from '../../../assets/svg';
import CreateFolder from './components/createFolder';
import UploadFile from './components/uploadFile';
import FileManagerMenu from './Menu';

const Index = () => {
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [uploadFileOpen, setUploadFileOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
  });
  const menuItems = [
    { id: 1, title: 'Create Folder' },
    { id: 2, title: 'Upload File' },
    { id: 3, title: 'Upload Folder' },
    { id: 4, title: 'Google Drive' },
  ];
  const dropDownmenu = (
    <Menu
      onClick={(item) => {
        if (item.key == 1) {
          setCreateFolderOpen(true);
        }
        if (item.key == 2) {
          setUploadFileOpen(true);
        }
        if (item.key == 3) {
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
    <div className='file-manager'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>Webinars&Talks</h3>
        </div>
        <div className='page-header-right'>
          <SearchInput
            callback={(searchValue) => {
              setFilters((s) => ({ ...s, search: searchValue }));
            }}
          />
          <Dropdown
            overlay={dropDownmenu}
            overlayClassName='create-file'
            trigger={['click']}
          >
            <div className='create-file-btn'>
              <PlusIcon />
              <span>Create New</span>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className='file-manager-card'>
        <FileManagerMenu />
        <div className='card-content'>
          <Outlet />
        </div>
      </div>
      <CreateFolder
        isOpen={createFolderOpen}
        cancel={() => setCreateFolderOpen(false)}
      />
      <UploadFile
        isOpen={uploadFileOpen}
        cancel={() => setUploadFileOpen(false)}
      />
    </div>
  );
};

export default Index;

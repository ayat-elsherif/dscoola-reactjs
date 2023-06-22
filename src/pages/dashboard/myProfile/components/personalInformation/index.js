import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Upload } from 'antd';
import PersonalInfoForm from './Form';
import { useGetProfileInfo } from './hooks/usePersonalInfo';
import fetch from '../../../../../auth/AuthInterceptor';
import { Loading } from '../../../../../components/common/Loading';

function PersonalInformation() {
  const [photo, setPhoto] = useState([]);

  const { data, isLoading, refetch } = useGetProfileInfo();

  const onPhotoChange = ({ file }) => {
    let formData = new FormData();
    formData.append('image', file);
    fetch({
      url: `api/my/photo`,
      method: 'post',
      data: formData,
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        message.success('Image Updated Successfully');
        refetch();
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  };

  const uploadProps = {
    showUploadList: false,
    name: 'image',
    accept: 'image/x-png,image/gif,image/jpeg',
    fileList: photo,
    customRequest: (file) => onPhotoChange(file),
  };

  const onRemoveAvater = () => setPhoto([]);

  if (!data?.data) return <Loading />;

  return (
    <>
      <div className="info-header">
        <h3>Personal Information</h3>
        <h4>contact information, Email</h4>
        <div className="form-section-title">Basic information</div>
      </div>
      <div className="basic-info">
        <div className="profil-photo-conrainer">
          <div className="photo">
            {data?.data?.photo_url ? (
              <img src={data?.data?.photo_url} alt="Profile" />
            ) : (
              <Avatar size={67} src={photo} icon={<UserOutlined />} />
            )}
          </div>
          <Upload {...uploadProps}>
            <button className="main-btn-dashboard">Upload new photo</button>
          </Upload>
          <Button
            type="primary"
            danger
            className="outline "
            onClick={onRemoveAvater}
          >
            Delete
          </Button>
        </div>
        <PersonalInfoForm data={data?.data} loading={isLoading} />
      </div>
    </>
  );
}

export default PersonalInformation;

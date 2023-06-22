import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Divider, message, Row, Spin, Upload } from 'antd';
import React from 'react';
import { useState } from 'react';
import {
  CvIcon,
  DeleteIcon,
  PdfIcon,
} from '../../../../../../../../assets/svg';
import PersonalInfoForm from '../../../../../../../dashboard/myProfile/components/personalInformation/Form';
import { useGetProfileInfo } from '../../../../../../../dashboard/myProfile/components/personalInformation/hooks/usePersonalInfo';
import './premiumTabs.scss';
import fetch from '../../../../../../../../auth/AuthInterceptor';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from 'components/common/Loading';
import DashboardButton from 'components/common/dashboard/components/button';

export default function BasicInformation({ onNext }) {
  const [photo, setPhoto] = useState('');
  const [cv, setCv] = useState([]);
  const [selecteddeleteId, setSelecteddeleteId] = useState();
  const { Dragger } = Upload;
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadCvLoading, setUploadCvLoading] = useState(false);

  console.log(cv, 'efwef');
  const { data, isLoading, refetch } = useGetProfileInfo();
  const queryClient = useQueryClient();
  const { cvLoading } = useQuery(
    [`instructor-cv`],
    () =>
      fetch({
        url: `api/instructor/cv`,
        method: 'get',

        headers: {
          'public-request': 'true',
        },
      })
        .then((res) => {
          setCv(res.data[0]);
          // message.success("CV Updated Successfully");
          // refetch();
        })
        .catch((err) => {
          message.error('Something went wrong');
        }),
    {
      // onSuccess: onSuccess,
      // onError: onError,
    },
  );
  const onCvChange = ({ file }) => {
    setUploadCvLoading(true);
    let formData = new FormData();
    formData.append('cv_file', file);
    fetch({
      url: `api/instructor/upload/cv`,
      method: 'post',
      data: formData,
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setUploadCvLoading(false);
        message.success('CV Updated Successfully');
        queryClient.invalidateQueries([`instructor-cv`]);
      })
      .catch((err) => {
        setUploadCvLoading(false);
        message.error('Something went wrong');
      });
  };
  const props = {
    showUploadList: false,
    name: 'cv',
    accept: '.doc,.docx,application/pdf',
    // fileList: photo,
    customRequest: (file) => onCvChange(file),
    beforeUpload: (file) => {
      console.log(file.size / 1024, 'roetijryhkt');
      const isSizable = file.size / 1024 < 3000;
      if (!isSizable) {
        message.error(`${file.name} is larger than 3 MB`);
      }
      return isSizable;
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files, 'MSOFMPWOEGM');
    },
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
      }}
      spin
    />
  );
  const uploadProps = {
    showUploadList: false,
    name: 'image',
    accept: 'image/x-png,image/gif,image/jpeg',
    fileList: photo,
    customRequest: (file) => onPhotoChange(file),
  };

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
  const handleDeleteCv = (id) => {
    setUploadLoading(true);
    fetch({
      url: `api/instructor/cv`,
      method: 'delete',
      data: { id: id },
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        queryClient.invalidateQueries([`instructor-cv`]);
        message.success('Deleted Successfully');
        setUploadLoading(false);
      })
      .catch((err) => {
        setUploadLoading(false);
        message.error('Something went wrong');
      });
  };
  return (
    <>
      <Row justify="space-between">
        <Col className="profile-data">
          <div className="basic-info">
            <div className="profil-photo-conrainer">
              <div className="Profile-Picture"> Profile Picture</div>
              <Row className="profile-pic-row" align="middle">
                <Col className="profile-photo" span={4}>
                  {data?.data?.photo_url ? (
                    <img src={data?.data?.photo_url} alt="Profile" />
                  ) : (
                    <Avatar size={67} src={photo} icon={<UserOutlined />} />
                  )}
                </Col>
                <Col>
                  {' '}
                  <Upload {...uploadProps}>
                    <button className="main-btn-dashboard">
                      upload another image
                    </button>
                  </Upload>
                </Col>
              </Row>
            </div>
            <PersonalInfoForm
              data={data?.data}
              loading={isLoading}
              premium={true}
            />
          </div>
        </Col>
        <Col>
          <div className="cv">
            <h3>Upload Resume</h3>
            {/* <Row justify="center" className="profile-upload-container">
              <Col span={24}> */}
            <Dragger className="profile-upload-dragger" {...props}>
              <CvIcon />
              <div className="drag">Drag & Drop Here Start Uploading.</div>
              <Divider classNam="info-divider" plain>
                Or
              </Divider>
              <Row justify="center">
                <DashboardButton
                  text="Browse files"
                  type="link"
                  loading={uploadCvLoading}
                  cssStyle={{ marginTop: '10px' }}
                />
              </Row>
            </Dragger>
            {/* </Col>
            </Row> */}
            <Row>
              <Col span={24}>
                {cv?.map((i, index) => {
                  return (
                    <Row
                      key={index}
                      align="middle"
                      className="profile-upload-cv-Row"
                      justify="space-between"
                    >
                      <Col>
                        <Row align="middle">
                          <Col>
                            <PdfIcon />
                          </Col>
                          <Col className="profile-upload-name">
                            {i.cv_file.slice(8, 65)}{' '}
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        {uploadLoading && selecteddeleteId === i.id ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          <DeleteIcon
                            onClick={() => {
                              handleDeleteCv(i.id);
                              setSelecteddeleteId(i.id);
                            }}
                            className="delete-icon-cv"
                          />
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row justify="end" gutter={[16]} className="pt-5">
        <Col>
          <Button onClick={onNext} type="primary">
            Save & Continue
          </Button>
        </Col>
      </Row>
    </>
  );
}

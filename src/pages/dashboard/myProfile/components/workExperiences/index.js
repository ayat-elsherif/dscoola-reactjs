import { EllipsisOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Col, Divider, Menu, Modal, Row } from 'antd';
import { AddIconExp, EmptyWorkEx } from 'assets/svg';
import { Loading } from 'components/common/Loading';
import dayjs from 'dayjs';
import useApi from 'network/useApi';
import React from 'react';
import { useState } from 'react';

import AddCertificate from './addCertificate';
import AddCompany from './addCompany';
import EllipsisDropdown from '../../../../../helpers/EllipsisDropdown';
import DeleteModal from './deleteModal';

const Index = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteWorkModal, setOpenDeleteWorkModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [cerId, setCerId] = useState('');
  const [expId, setexpId] = useState('');
  const [isCompanytModalOpen, setIsCompanytModalOpen] = useState(false);
  const onWorkExpSucc = () => {};
  const onWorkExpErr = () => {};
  const { data: workExpDAta, isLoading: workExpLoading } = useQuery(
    [`work-experience`],
    () => {
      return api.get(`instructor/work-experience`);
    },
    {
      onSuccess: onWorkExpSucc,
      onError: onWorkExpErr,
    },
  );
  const { data: certifDAta, isLoading: certifLoading } = useQuery(
    [`certificate`],
    () => {
      return api.get(`instructor/certificate`);
    },
    {
      onSuccess: onWorkExpSucc,
      onError: onWorkExpErr,
    },
  );
  const expMenu = (id) => {
    return (
      <Menu
        onClick={(item) => {
          if (item.key == 1) {
            setIsCertModalOpen(true);
            setexpId(id);
          }
          if (item.key == 2) {
            setOpenDeleteModal(true);
            setCerId(id);
          }
        }}
      >
        <Menu.Item key="1">
          <span>Edit</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span>Delete</span>
        </Menu.Item>
      </Menu>
    );
  };
  const companyMenu = (id) => {
    return (
      <Menu
        onClick={(item) => {
          if (item.key == 1) {
            setIsCompanytModalOpen(true);
            setCerId(id);
          }
          if (item.key == 2) {
            setOpenDeleteWorkModal(true);
            setCerId(id);
          }
        }}
      >
        <Menu.Item key="1">
          <span>Edit</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span>Delete</span>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <>
      {workExpLoading || certifLoading || loading ? (
        <Loading />
      ) : (
        <div>
          {' '}
          <div className="info-header">
            <h3>Work Experiences</h3>
            <h4>Certifications , Experience</h4>

            <Row className="form-section-title-work" justify="space-between">
              <Col>Certifications</Col>
              <Col
                onClick={() => setIsCertModalOpen(true)}
                className="col-Certifications"
              >
                <AddIconExp />
                Add
              </Col>
            </Row>
          </div>
          <Row gutter={[16]} className="work-experiences-container">
            {certifDAta?.data?.length < 1 || !certifDAta ? (
              <Col style={{ width: '100%' }}>
                {' '}
                <Row className="pt-5 pb-3" justify="center">
                  <Col>
                    <EmptyWorkEx />
                  </Col>
                </Row>
                <Row className=" pb-5" justify="center">
                  <Col style={{ fontSize: '14px' }}>
                    you don't have any Certifications yet
                  </Col>
                </Row>
              </Col>
            ) : (
              <>
                {' '}
                {certifDAta?.data?.map((i, index) => {
                  return (
                    <>
                      {' '}
                      <Col span={24} className="">
                        <Row className="work-experiences-item">
                          <Col span={5}>
                            <img
                              className="work-experiences-image"
                              src={
                                'https://dscoola-files.s3.eu-west-1.amazonaws.com/' +
                                i.image
                              }
                              alt="wed"
                            />
                          </Col>
                          <Col span={18}>
                            <Row gutter={[16, 16]} className="mt-3">
                              <Col span={24} className="cert-title">
                                {i.certificate_name}
                              </Col>
                              <Col className="cert-detail" span={24}>
                                {i.provider}
                              </Col>
                              <Col className="cert-detail" span={24}>
                                Issued :{' '}
                                {dayjs(i.issue_date).format('MMM YYYY')}
                              </Col>
                            </Row>
                          </Col>
                          <Col span={1}>
                            <EllipsisDropdown menu={expMenu(i.id)} />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        {' '}
                        <Divider />
                      </Col>
                    </>
                  );
                })}
              </>
            )}
          </Row>
          <Row className="form-section-title-work" justify="space-between">
            <Col>Experience</Col>
            <Col
              onClick={() => setIsCompanytModalOpen(true)}
              className="col-Certifications"
            >
              <AddIconExp />
              Add
            </Col>
          </Row>
          <Row gutter={[16]} className="work-experiences-container">
            {workExpDAta?.data?.length < 1 || !workExpDAta ? (
              <Col style={{ width: '100%' }}>
                {' '}
                <Row className="pt-5 pb-3" justify="center">
                  <Col>
                    <EmptyWorkEx />
                  </Col>
                </Row>
                <Row className=" pb-5" justify="center">
                  <Col style={{ fontSize: '14px' }}>
                    you don't have any Experience yet
                  </Col>
                </Row>
              </Col>
            ) : (
              <>
                {workExpDAta?.data?.map((i, index) => {
                  let startTime = dayjs(i.start_date);
                  let endTime = dayjs(i.end_date);
                  const totalDuration = endTime.diff(startTime, 'month');

                  return (
                    <>
                      <Col key={index} span={24}>
                        <Row className="work-experiences-item">
                          <Col span={5}>
                            <img
                              className="work-experiences-image"
                              src={
                                'https://dscoola-files.s3.eu-west-1.amazonaws.com/' +
                                i.company_logo
                              }
                              alt="wed"
                            />
                          </Col>
                          <Col span={18}>
                            <Row gutter={[16, 16]} className="mt-3">
                              <Col span={24} className="cert-title">
                                {i.job_title}
                              </Col>
                              <Col className="cert-detail" span={24}>
                                {i.company_name}
                              </Col>
                              <Col className="cert-detail" span={24}>
                                {/* Aug 2021 - Nov 2021 · 4 mos */}
                                {dayjs(i.start_date).format('MMM YYYY')} -{' '}
                                {dayjs(i.start_date).format('MMM YYYY')
                                  ? dayjs(i.end_date).format('MMM YYYY')
                                  : null}{' '}
                                . {totalDuration} mos
                              </Col>
                            </Row>
                          </Col>
                          <Col span={1}>
                            <EllipsisDropdown menu={companyMenu(i.id)} />
                          </Col>
                        </Row>
                      </Col>
                      <Col key={index} span={24}>
                        <Divider />
                      </Col>
                    </>
                  );
                })}
              </>
            )}
          </Row>
          <Modal
            title="Add New Certificate"
            open={isCertModalOpen}
            onCancel={() => setIsCertModalOpen(false)}
            footer={false}
            width="484px"
          >
            <AddCertificate
              expId={expId}
              close={() => setIsCertModalOpen(false)}
            />
          </Modal>
          <Modal
            title="Add New Experience"
            open={isCompanytModalOpen}
            onCancel={() => setIsCompanytModalOpen(false)}
            footer={false}
            width="484px"
          >
            <AddCompany
              cerId={cerId}
              close={() => setIsCompanytModalOpen(false)}
            />
          </Modal>
          <DeleteModal
            open={openDeleteModal}
            header="Are You sure?"
            body="You Want To Delete This certificate ?"
            handleCancel={() => setOpenDeleteModal(false)}
            loading={loading}
            handleDelete={() => {
              setLoading(true);
              api
                .delete(`instructor/certificate/${cerId}`)
                .then(() => {
                  setLoading(false);
                  queryClient.invalidateQueries([`certificate`]);
                  setOpenDeleteModal(false);
                })
                .catch(() => {
                  setLoading(false);
                  setOpenDeleteModal(false);
                });
            }}
          />
          <DeleteModal
            open={openDeleteWorkModal}
            header="Are You sure?"
            body="You Want To Delete This Experience?"
            handleCancel={() => setOpenDeleteWorkModal(false)}
            loading={loading}
            handleDelete={() => {
              setLoading(true);
              api
                .delete(`instructor/work-experience/${cerId}`)
                .then(() => {
                  setLoading(false);
                  queryClient.invalidateQueries([`work-experience`]);
                  setOpenDeleteWorkModal(false);
                })
                .catch(() => {
                  setLoading(false);
                  setOpenDeleteWorkModal(false);
                });
            }}
          />
        </div>
      )}
    </>
  );
};

export default Index;

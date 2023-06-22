import {
  Table,
  Pagination,
  InputNumber,
  Row,
  Col,
  Dropdown,
  Menu,
  Modal,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowNextIcon,
  ArrowUpIcon,
  EllipsIcon,
} from '../../../../../assets/svg';

import './index.scss';
import DeleteModal from '../deleteModal';
import EditAnnouncementModal from '../EditForm';
import { useQuery } from '@tanstack/react-query';
import useApi from 'network/useApi';
import { useSelector } from 'react-redux';
import AddModal from '../addModal';

const AnnoncementTable = ({ filters }) => {
  const navigate = useNavigate();
  const api = useApi();
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const { currentUser } = useSelector((state) => state?.user);
  const [addFormOpen, setAddFormOpen] = useState(false);

  const instructorId = currentUser?.user_id;
  const handlePageChange = (page) => {
    setPage(page);
  };
  const { data: Courses } = useQuery([`instructor-courses`], () => {
    return api.get(
      `courses/auth/filter?perpage=1000&instructor[]=${instructorId}`,
    );
  });
  const { data: Annoncement, isLoading } = useQuery(
    [`get-annoncement`, page, filters.search],
    () => {
      return api.get(
        `instructor/announcement?page=${page}&title=*${filters.search}*`,
      );
    },
  );

  const actionMenu = (id) => {
    return (
      <Menu
        onClick={(item) => {
          if (item.key == 1) {
            setAddFormOpen(true);
            setDeleteId(id);
          }
          if (item.key == 2) {
            setShowDeleteModal(true);
            setDeleteId(id);
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
  const columns = [
    {
      title: 'Annoncement',
      dataIndex: 'annoncement',
      key: 'Annoncement',
      render: (_, elm) => {
        return (
          <>
            {elm?.title?.length > 43
              ? elm.title.substring(0, 43) + '...'
              : elm?.title}
          </>
        );
      },
    },
    {
      title: 'Course Name',
      // dataIndex: 'course_id',
      key: 'course_id',
      render: (_, elm) => {
        const found = Courses?.data.find(
          (element) => element?.id === elm.course_id,
        );

        return <> {found?.title}</>;
      },
    },

    {
      title: '',
      dataIndex: 'action',
      key: 'x',
      width: 50,

      render: (_, elm) => (
        <div
          className="text-center"
          onClick={(event) => event.stopPropagation()}
        >
          <Dropdown
            overlay={actionMenu(elm)}
            trigger={['click']}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
            overlayClassName="table-actions-menu"
          >
            <EllipsIcon />
          </Dropdown>
        </div>
      ),
    },
  ];

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a>
          <ArrowBackIcon />
        </a>
      );
    }

    if (type === 'next') {
      return (
        <a>
          <ArrowNextIcon />
        </a>
      );
    }

    return originalElement;
  };
  const onPageNumberChange = (value) => {
    setPage(value);
  };

  return (
    <div className="main-table annoncement-table">
      <Table
        pagination={false}
        loading={isLoading}
        columns={columns}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <div className="question-conatiner">
              <div className="header">
                <Row gutter={8}>
                  <Col xs={12}>Annoncement</Col>
                </Row>
              </div>
              <div className="contant">
                <Row gutter={8}>
                  <Col xs={20}>
                    {
                      <p
                        dangerouslySetInnerHTML={{
                          __html: record?.description,
                        }}
                      />
                    }
                  </Col>
                  {record?.voice_url && (
                    <Col span={24}>
                      <div className="record">
                        <audio src={record?.voice_url} controls />
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <span
                style={{ width: '50px', diplay: 'inline-block' }}
                onClick={(e) => onExpand(record, e)}
              >
                <ArrowUpIcon />
              </span>
            ) : (
              <span
                style={{ width: '50px', diplay: 'inline-block' }}
                onClick={(e) => onExpand(record, e)}
              >
                <ArrowDownIcon />
              </span>
            ),
        }}
        dataSource={Annoncement?.data}
        bordered
      />
      <div className="main-table_footer">
        <div className="change-page">
          <span>Go to page :</span>{' '}
          <InputNumber min={1} defaultValue={1} onChange={onPageNumberChange} />{' '}
        </div>
        <Pagination
          size="small"
          total={Annoncement?.pagination?.total}
          defaultPageSize={20}
          current={page}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
      {console.log(page, 'wrklegtjrpoeg')}
      <EditAnnouncementModal
        isOpen={showEditModal}
        cancel={() => setShowEditModal(false)}
      />
      <DeleteModal
        isOpen={showDeleteModal}
        id={deleteId}
        cancel={() => setShowDeleteModal(false)}
      />
      <Modal
        title="Add Announcement"
        open={addFormOpen}
        onCancel={() => setAddFormOpen(false)}
        footer={false}
        destroyOnClose
        width="484px"
      >
        <AddModal close={() => setAddFormOpen(false)} id={deleteId} />
      </Modal>
    </div>
  );
};

export default AnnoncementTable;

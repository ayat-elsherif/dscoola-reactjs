import {
  Table,
  Pagination,
  InputNumber,
  Row,
  Col,
  Select,
  Menu,
  Dropdown,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import EditMeetingModal from '../editMeeting';
import DeleteModal from '../deleteModal';
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowNextIcon,
  ArrowUpIcon,
  PendingArrowIcon,
  PendingIcon,
} from '../../../../../../assets/svg';
import './index.scss';
import DashboardButton from '../../../../../../components/common/dashboard/components/button';

const StudentRequestTabel = () => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const renderStatusColor = (status) => {
    return (
      <div className={`status ${status.replaceAll(' ', '-')}`}>{status}</div>
    );
  };

  const actionMenu = (
    <Menu
      onClick={(item) => {
        if (item.key == 1) {
          setEditIsOpen(true);
        }
        if (item.key == 2) {
          setDeleteIsOpen(true);
        }
      }}
    >
      <Menu.Item key='1'>
        <span>Accept</span>
      </Menu.Item>
      <Menu.Item key='2'>
        <span>Reject</span>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Id',
      dataIndex: 'question',
      key: 'question',
      render: (_, elm) => {
        return <>{elm.question.id}</>;
      },
    },

    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      with: 84,
      render: (_, elm) => {
        return <>{renderStatusColor(elm.Status)}</>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      with: 84,
      render: (_, elm) => {
        return (
          <>
            {/* <Dropdown
              overlay={actionMenu}
              trigger={['click']}
              overlayClassName='status-dropdown-table'
            >
              <div>
                <span>
                  <PendingIcon />
                </span>
                <span>{elm.Status}</span>
                <span>
                  <PendingArrowIcon />
                </span>
              </div>
            </Dropdown> */}
            <DashboardButton
              text='Join'
              btnClass='btn-modal'
              onclick={() => {
                navigate('video-chat', {
                  state: { roomName: `${elm.studentName}${elm.key}` },
                });
              }}
              // type='link'
              cssStyle={{ height: '29px', width: '57px' }}
              disabled={elm.Status === 'Happening' ? false : true}
            />
          </>
        );
      },
    },
  ];
  const data = [
    {
      key: 1,
      question: {
        id: 1,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Happening',
    },
    {
      key: 2,
      question: {
        id: 2,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
    },
    {
      key: 3,
      question: {
        id: 3,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
    },
    {
      key: 4,
      question: {
        id: 4,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
    },
    {
      key: 5,
      question: {
        id: 5,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
    },
    {
      key: 6,
      question: {
        id: 6,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
    },
    {
      key: 7,
      question: {
        id: 7,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
    },
    {
      key: 8,
      question: {
        id: 8,
        Title: 'How to solve creative cloud errror',
        desc: "When I open creative cloud he give me error that I don't have program on my device and don't accept to download it",
      },
      studentName: 'Mai Mohamed',
      email: 'MaiMohamed@gmail.com',
      courseName: 'Machine Learning',
      date: 'Nov 20, 2022 10:34 PM',
      Status: 'Upcoming',
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
    <div className='main-table student-request-table'>
      <Table
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div className='question-conatiner'>
              <div className='header'>
                <Row gutter={16}>
                  <Col xs={12}>Title</Col>
                  <Col xs={12}>Description</Col>
                </Row>
              </div>
              <div className='contant'>
                <Row gutter={16}>
                  <Col xs={12}>{record.question.Title}</Col>
                  <Col xs={12} style={{ paddingRight: '20px' }}>
                    {record.question.desc}
                  </Col>
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
        dataSource={data}
        bordered
      />
      <div className='main-table_footer'>
        <div className='change-page'>
          <span>Go to page :</span>{' '}
          <InputNumber min={1} defaultValue={1} onChange={onPageNumberChange} />{' '}
        </div>
        <Pagination
          size='small'
          total={100}
          defaultPageSize={10}
          current={page}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
      <EditMeetingModal
        isOpen={editIsOpen}
        cancel={() => setEditIsOpen(false)}
      />
      <DeleteModal
        isOpen={deleteIsOpen}
        cancel={() => setDeleteIsOpen(false)}
      />
    </div>
  );
};

export default StudentRequestTabel;

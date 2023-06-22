import { Table, Pagination, InputNumber, Row, Col, Dropdown, Menu } from 'antd';
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
import EditAnswerModal from '../EditEnswer';

const QATable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
          setShowEditModal(true);
        }
        if (item.key == 2) {
          setShowDeleteModal(true);
        }
      }}
    >
      <Menu.Item key='1'>
        <span>Edit</span>
      </Menu.Item>
      <Menu.Item key='2'>
        <span>Delete</span>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: 'Questions',
      dataIndex: 'questions',
      key: 'questions',
      render: (_, elm) => {
        return <>{elm.questions[0].question.substring(0, 43) + '...'}</>;
      },
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },

    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },

    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (_, elm) => {
        return <>{renderStatusColor(elm.Status)}</>;
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'x',
      width: 50,
      render: (_, elm) => (
        <div
          className='text-center'
          onClick={(event) => event.stopPropagation()}
        >
          <Dropdown
            overlay={actionMenu}
            trigger={['click']}
            placement='bottomRight'
            arrow={{
              pointAtCenter: true,
            }}
            overlayClassName='table-actions-menu'
          >
            <EllipsIcon />
          </Dropdown>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Answered',
    },
    {
      key: 2,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Answered',
    },
    {
      key: 3,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Answered',
    },
    {
      key: 4,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Not Answered',
    },
    {
      key: 5,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Not Answered',
    },
    {
      key: 6,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'complete',
    },
    {
      key: 7,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Answered',
    },
    {
      key: 8,
      questions: [
        {
          question:
            'In object oriented design of software which object class is defined',
          answer: 'Classes are defined based on the attributes of the object',
        },
      ],
      courseName: 'Machine Learning',
      studentName: 'Mai Mohamed',
      Status: 'Answered',
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
    <div className='qa-table'>
      <Table
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div className='question-conatiner'>
              <div className='header'>
                <Row gutter={8}>
                  <Col xs={14}>Questions</Col>
                  <Col xs={10}>My Answer</Col>
                </Row>
              </div>
              <div className='contant'>
                <Row gutter={8}>
                  <Col xs={14}>{record.questions[0].question}</Col>
                  <Col xs={10}>{record.questions[0].answer}</Col>
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
      <div className='invoices-table_footer'>
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
      <EditAnswerModal
        isOpen={showEditModal}
        cancel={() => setShowEditModal(false)}
      />
      <DeleteModal
        isOpen={showDeleteModal}
        cancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default QATable;

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
import React, { useEffect, useState } from 'react';
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
import { useGetOneOneOneList } from '../../hooks/useOneOnOne';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { saveBookingId } from '../../../../../../features/chatRoom/chatRoom';
import useApi from 'Hooks/network/useApi';

const StudentRequestTabel = ({ filters }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sessionList, setSessionList] = useState(1);

  const dispatch = useDispatch();
  const api = useApi();
  const { data, isLoading } = useGetOneOneOneList(page, filters);
  const { currentUser } = useSelector((state) => state?.user);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleFetchList = () => {
    api.get('appointment/list??perpage=100000').then((res) => {
      const InstructorSessions = res?.data?.find(
        (i) => i?.instructor?.id === currentUser?.user_id,
      );

      setSessionList(InstructorSessions);
    });
  };

  useEffect(() => {
    handleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStatusColor = (status) => {
    return (
      <div className={`status ${status.replaceAll(' ', '-')}`}>{status}</div>
    );
  };

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, elm) => {
        return <>{dayjs(elm.date).format('ll')}</>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'meeting_status',
      key: 'meeting_status',
      with: 84,
      render: (_, elm) => {
        return <>{renderStatusColor(elm.meeting_status)}</>;
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
            <DashboardButton
              text="Join"
              btnClass="btn-modal"
              onclick={() => {
                dispatch(saveBookingId(elm.id));
                navigate(`/video-chat`);
              }}
              // type='link'
              cssStyle={{ height: '29px', width: '57px' }}
              // disabled={elm.meeting_status === 'happening' ? false : true}
            />
          </>
        );
      },
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
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
    <div className="main-table student-request-table">
      <Table
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <div className="question-conatiner">
                <div className="header">
                  <Row gutter={16}>
                    <Col xs={12}>Title</Col>
                    <Col xs={12}>Description</Col>
                  </Row>
                </div>
                <div className="contant">
                  <Row gutter={16}>
                    <Col xs={12}>{record?.title}</Col>
                    <Col xs={12} style={{ paddingRight: '20px' }}>
                      {record?.booking_description}
                    </Col>
                  </Row>
                </div>
              </div>
            );
          },
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
        dataSource={data?.data}
        loading={isLoading}
        bordered
      />
      <div className="main-table_footer">
        <div className="change-page">
          <span>Go to page :</span>{' '}
          <InputNumber
            min={1}
            defaultValue={1}
            max={data?.meta?.total}
            onChange={onPageNumberChange}
          />{' '}
        </div>
        <Pagination
          size="small"
          total={data?.meta?.total}
          defaultPageSize={10}
          current={page}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
      {/* <EditMeetingModal
        isOpen={editIsOpen}
        cancel={() => setEditIsOpen(false)}
      />
      <DeleteModal
        isOpen={deleteIsOpen}
        cancel={() => setDeleteIsOpen(false)}
      /> */}
    </div>
  );
};

export default StudentRequestTabel;

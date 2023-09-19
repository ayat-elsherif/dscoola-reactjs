import { Table, Pagination, Row, Col } from 'antd';
import SearchInput from 'components/common/dashboard/components/serachInput';
import StatusFilter from 'components/common/dashboard/components/statusFilter';
import dayjs from 'dayjs';
import useApi from 'Hooks/network/useApi';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from '../../../../../../assets/svg';
import DeleteModal from '../../deleteModal';
// import { CSVLink } from 'react-csv';

import './index.scss';

const WebinarsTalksTabel = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [webinarList, setWebinarList] = useState([]);
  const [paginationState, setPagination] = useState([]);
  const [categries, setCategries] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const componentRef = useRef();

  const [filters, setFilters] = useState({
    search: '',
    export: '',
  });
  const [excelData, setExcelData] = useState([]);

  // const exportMenu = [
  //   { id: 1, value: 'Pdf' },
  //   {
  //     id: 2,
  //     value: (
  //       <CSVLink
  //         style={{
  //           background: 'transparent',
  //           height: 'auto',
  //           width: 'auto',
  //           color: '#000',
  //           lineHeight: 'unset',
  //           margin: 0,
  //           display: 'inline-block',
  //         }}
  //         className="ant-select-selection-item"
  //         filename="Webinar.csv"
  //         data={excelData || []}
  //       >
  //         Excel
  //       </CSVLink>
  //     ),
  //   },
  //   { id: 3, value: 'Print' },
  // ];

  const handlePageChange = (page) => {
    setPage(page);
    handleGetWebinar(
      `webinar/my-webinar?includes=zoomMeetings,creator?page=${page}`,
    );
  };

  const handleGetWebinar = (url) => {
    setLoading(true);
    api
      .get(url ? url : 'webinar/my-webinar?includes=zoomMeetings,creator')
      .then((res) => {
        setWebinarList(res?.data);
        setPagination(res?.pagination);
        setLoading(false);
      });
  };

  // const handleGetWebinarBySearch = (url) => {
  //   api.get(`webinar?title=no`).then((res) => {
  //     setWebinarList(res?.data);
  //     setPagination(res?.pagination);
  //   });
  // };
  const handleGetCategories = () => {
    api.get(`categories/parent`).then((res) => {
      setCategries(res?.data);
    });
  };

  useEffect(() => {
    handleGetWebinar();
    handleGetCategories();
    // handleGetWebinarBySearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStatusColor = (status) => {
    return (
      <div className={`status ${status.replaceAll(' ', '-')}`}>
        {status === 'closed' ? 'expired' : status}
      </div>
    );
  };

  const columns = [
    {
      title: 'Meeting Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, elm) => {
        return (
          <>
            {
              categries?.find((i) => i.id === elm?.parent_category_id)
                ?.category_name
            }
          </>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price_plan',
      key: 'price_plan',
      render: (_, elm) => {
        return (
          <>
            {elm?.price_plan === 'free' ? elm?.price_plan : `${elm?.price} $`}
          </>
        );
      },
      width: 50,
    },
    {
      title: 'Enrolled',
      dataIndex: 'total_webinar',
      key: 'total_webinar',
      render: (_, elm) => {
        return <>{elm?.total_webinar} Members</>;
      },
      width: 150,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (_, elm) => {
        return <>Single Meeting</>;
      },
    },

    {
      title: 'Status',
      dataIndex: 'webinar_status',
      key: 'webinar_status',
      width: 84,
      render: (_, elm) => {
        return <>{renderStatusColor(elm?.webinar_status)}</>;
      },
    },
  ];

  useEffect(() => {
    const data = webinarList?.map((item) => {
      return {
        'Meeting Name': item.title,
        Price: item?.price_plan,
        Enrolled: `${item?.total_webinar} members`,
        Type: 'Single Meeting',
        Category: categries?.find((i) => i.id === item?.parent_category_id)
          ?.category_name,
        Status: item?.webinar_status,
        'Start Date': item?.start_date,
        'End Date': item?.end_date,
        Duration: item?.duration,
        Host: item?.host,
      };
    });
    console.log({ data });
    setExcelData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webinarList]);

  const handlePrintPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">Webinars & Talks</h3>
        </div>
        <div className="page-header-right">
          <SearchInput
            callback={(searchValue) => {
              setFilters((s) => ({ ...s, search: searchValue }));
              console.log(!!searchValue);
              if (!!searchValue) {
                setLoading(true);
                api
                  .get(`webinar/filter?instructor[]=${searchValue}`)
                  .then((res) => {
                    setWebinarList(res?.data);
                    setLoading(false);
                  });
              } else handleGetWebinar();
            }}
          />
          <StatusFilter
            menuOption={[]}
            // menuOption={exportMenu}
            callback={(exportVal) => {
              setFilters((s) => ({ ...s, export: exportVal }));
              if (exportVal !== 2) handlePrintPdf();
            }}
            palceholder="Export"
          />
          <Link to="meeting/add">
            <PlusIcon /> Add
          </Link>
        </div>
      </div>
      <div className="main-table one-table">
        <div ref={componentRef}>
          <Table
            pagination={false}
            columns={columns}
            loading={loading}
            expandable={{
              expandedRowRender: (record) => (
                <div className="question-conatiner">
                  <div className="header">
                    <Row gutter={16}>
                      <Col xs={3}>Start date</Col>
                      <Col xs={3}>End date</Col>
                      <Col xs={3}>Host</Col>
                      <Col xs={3}>Duration</Col>
                    </Row>
                  </div>
                  <div className="contant">
                    <Row gutter={16}>
                      <Col xs={3}>
                        {dayjs(record.start_date).format('DD/MM/YYYY')}
                      </Col>
                      <Col xs={3}>
                        {dayjs(record.end_date).format('DD/MM/YYYY')}
                      </Col>
                      <Col xs={3}>{record.host}</Col>
                      <Col xs={3}>{record.duration}</Col>
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
            dataSource={webinarList}
            rowKey="id"
            bordered
          />
        </div>
        <div
          className="main-table_footer"
          style={{ justifyContent: 'flex-end' }}
        >
          <Pagination
            size="small"
            pageSize={paginationState?.perPage || 10}
            total={paginationState?.total}
            // defaultPageSize={paginationState?.perPage}
            current={page}
            onChange={handlePageChange}
          />
        </div>

        <DeleteModal
          isOpen={deleteIsOpen}
          cancel={() => setDeleteIsOpen(false)}
        />
      </div>
    </>
  );
};

export default WebinarsTalksTabel;

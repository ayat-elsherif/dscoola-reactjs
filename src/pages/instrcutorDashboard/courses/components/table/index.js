import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import Table from './tableView';
import './index.scss';
import SearchInput from '../../../../../components/common/dashboard/components/serachInput';
import StatusFilter from '../../../../../components/common/dashboard/components/statusFilter';
import { PlusIcon } from '../../../../../assets/svg';
import { useGetCourses } from './hooks/useGetCourses';
import fetch from '../../../../../auth/AuthInterceptor';
import { Col, message, Modal, Row } from 'antd';
import AddInitCoursForm from './tableView/addInitCoursForm';
import { useReactToPrint } from 'react-to-print';
import { Excel } from 'antd-table-saveas-excel';
function CoursesTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    export: '',
  });
  const Filtermenu = [
    { id: 1, value: 'Active' },
    { id: 0, value: 'Pending' },
    { id: 2, value: 'Rejected' },
  ];
  const exportMenu = [
    { id: 1, value: 'Pdf' },
    { id: 2, value: 'Excel' },
  ];
  const { data: cousrses } = useGetCourses();
  const componentRef = useRef();

  const handlePrintPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintExcel = () => {
    const excel = new Excel();

    const columnsCopy = [
      {
        title: 'Course Name',
        dataIndex: 'title',
        key: 'title',
        // render: (_, elm) => {
        //   console.log(elm, 'pdijg');
        //   return (
        //     <div className="course-title">
        //       <div>
        //         <img src={elm.thumbnailurl} />
        //       </div>
        //       <div>{elm.title}</div>
        //     </div>
        //   );
        // },
      },
      {
        title: 'Category',
        dataIndex: 'category_name',
        key: 'category_name',
        
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
       
      },
      {
        title: 'Student',
        dataIndex: 'totalEnrolled',
        key: 'totalEnrolled',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 84,
        // render: (_, elm) => {
        //   // return <>{renderStatusColor(elm?.status)}</>;
        // },
      },
      {
        title: 'Featured',
        dataIndex: 'is_featured',
        key: 'is_featured',
        // render: (_, elm) => {
        //   return <>{elm.is_featured ? 'Yes' : 'No'}</>;
        // },
      },
      {
        title: ' ',
        dataIndex: 'action',
        key: 'x',
        width: 50,
        // render: (_, elm) => <EllipsisDropdown menu={actionMenu(elm)} />,
      },
    ];

    excel
      .addSheet('test')
      .addColumns(columnsCopy)
      .addDataSource(cousrses?.data, {
        str2Percent: true,
      })
      .saveAs('Excel.xlsx');
  };

  return (
    <>
      <div className="courses">
        <div className="dashboard-page-header-container">
          <div className="page-header-left">
            <h3 className="dashboard-page-title">Courses</h3>
            <p>You have total {cousrses?.meta?.total} Courses</p>
          </div>
          <div className="page-header-right">
            <SearchInput
              callback={(value) => {
                setFilters((s) => ({ ...s, search: value }));
              }}
            />
            <StatusFilter
              menuOption={Filtermenu}
              callback={(status) => {
                setFilters((s) => ({ ...s, status: status }));
              }}
              palceholder="Select Status"
            />
            <StatusFilter
              menuOption={exportMenu}
              callback={(exportVal) => {
                // setFilters((s) => ({ ...s, export: exportVal }));
                if (exportVal === 1) {
                  return handlePrintPdf();
                } else if (exportVal === 2) {
                  return handlePrintExcel();
                }
              }}
              palceholder="Export"
            />
            <Link onClick={showModal} to="#">
              <PlusIcon /> Add
            </Link>
          </div>
        </div>
        <div ref={componentRef}>
          <Table filters={filters} />{' '}
        </div>

        <Modal
          className="init-course-modal"
          centered
          title="Create Course"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width="492px"
          footer={null}
        >
          <AddInitCoursForm />
        </Modal>
      </div>
    </>
  );
}

export default CoursesTable;

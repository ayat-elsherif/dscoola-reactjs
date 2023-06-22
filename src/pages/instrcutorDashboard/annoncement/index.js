import React, { useState } from 'react';

import { ArrowIcon } from '../../../assets/svg';
import StatusFilter from '../../../components/common/dashboard/components/statusFilter';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import Table from './components/table';
import './index.scss';
import { Button, Col, Form, Modal, Row } from 'antd';
import AddModal from './components/addModal';

const Annoncement = () => {
  const [addFormOpen, setAddFormOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
  });

  return (
    <div className="annoncement">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">
            Courses <ArrowIcon /> <span>Annoncement</span>
          </h3>
        </div>
        <div className="page-header-right">
          <Row gutter={[16, 16]}>
            <Col>
              {' '}
              <SearchInput
                callback={(searchValue) => {
                  setFilters((s) => ({ ...s, search: searchValue }));
                }}
              />
            </Col>
            <Col>
              <Button onClick={() => setAddFormOpen(true)} type="primary">
                Add
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Table filters={filters} />
      <Modal
        title="Add Announcement"
        open={addFormOpen}
        destroyOnClose
        onCancel={() => {
          setAddFormOpen(false);
        }}
        footer={false}
        width="484px"
        height="600px"
      >
        <AddModal close={() => setAddFormOpen(false)} />
      </Modal>
    </div>
  );
};

export default Annoncement;

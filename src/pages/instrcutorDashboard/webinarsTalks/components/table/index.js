import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PlusIcon } from '../../../../../assets/svg';
import SearchInput from '../../../../../components/common/dashboard/components/serachInput';
import StatusFilter from '../../../../../components/common/dashboard/components/statusFilter';

import Table from './tableData';
import './index.scss';
import useApi from 'Hooks/network/useApi';
const WebinarsTalks = () => {
  return (
    <div className="webinars-talks">
      <Table />
    </div>
  );
};

export default WebinarsTalks;

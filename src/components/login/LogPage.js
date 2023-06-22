import React from 'react';
import { Outlet } from 'react-router-dom';
import LogLeftSide from './LogLeftSide';
function LogPage() {
  return (
    <>
      <div className="container-fluid h-100">
        <div className=" h-100 logContainer d-flex ">
          <div className="d-flex flex-column justify-content-between pt-5 logLeftSide">
            <LogLeftSide />
          </div>
          <div className="d-flex align-self-center logRightSide">
            {/* <Lang /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LogPage;

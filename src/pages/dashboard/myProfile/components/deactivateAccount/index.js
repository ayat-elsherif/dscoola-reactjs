import { Button } from 'antd';
import React, { useState } from 'react';
import DeactivateModal from './components/deactivateModal';
import './index.scss';
function DeactivateAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="deactivate-account">
      <div className="info-header">
        <h3>Deactivate Account</h3>
        <h4>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. you must set
          your password to deactivate your account
        </h4>
      </div>
      <div className="deactivate-body">
        <div>
          <Button
            className="main-btn-dashboard"
            onClick={() => setIsOpen(true)}
          >
            Deactivate Account
          </Button>
        </div>
        <img src="/assets/images/warning.png" alt="warning" />
      </div>
      <DeactivateModal isOpen={isOpen} cancel={hideModal} />
    </div>
  );
}

export default DeactivateAccount;

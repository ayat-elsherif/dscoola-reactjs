import React, { useState } from 'react';
import ChangePasswordForm from './form';

import './index.scss';
const SecuritySettings = () => {
  const [viewForm, setViewForm] = useState(false);
  return (
    <div className='scurity-settings'>
      <div className='info-header'>
        <h3>Security Settings</h3>
        <h4>These settings are helps you keep your account secure.</h4>
      </div>
      <div className='changepass-card'>
        <div className='inform'>
          <h3>Change Password</h3>
          <p>Set a unique password to protect your account.</p>
        </div>
        <button
          className='main-btn-dashboard'
          onClick={() => setViewForm(!viewForm)}
        >
          change password
        </button>
      </div>
      {viewForm && <ChangePasswordForm callBack={() => setViewForm(false)} />}
    </div>
  );
};

export default SecuritySettings;

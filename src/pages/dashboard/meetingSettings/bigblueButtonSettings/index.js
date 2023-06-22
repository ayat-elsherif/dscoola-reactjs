import React from 'react';
import SettingForm from './components/settingForm';
import './index.scss';
function BigblueButtonSettings() {
  return (
    <div className='meeting-settings'>
      {' '}
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>Bigbluebutton Settings</h3>
        </div>
      </div>
      <SettingForm />
    </div>
  );
}

export default BigblueButtonSettings;

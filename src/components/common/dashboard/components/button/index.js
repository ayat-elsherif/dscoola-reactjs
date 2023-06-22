import { Button } from 'antd';
import React from 'react';
import './index.scss';
function DashboardButton({
  text,
  btnClass,
  onclick,
  type,
  cssStyle,
  loading = false,
  disabled = false,
  htmlType,
}) {
  return (
    <Button
      className={`dashboard-button ${btnClass ? btnClass : ''}`}
      onClick={onclick ? onclick : () => ''}
      type={type ? type : null}
      style={cssStyle ? cssStyle : {}}
      loading={loading}
      disabled={disabled}
      htmlType={htmlType}
    >
      {text}
    </Button>
  );
}

export default DashboardButton;

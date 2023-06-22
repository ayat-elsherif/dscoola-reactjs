import { Button } from 'antd';
import React from 'react';
function MainButton({
  text,
  btnClass,
  onclick,
  type,
  cssStyle,
  disabled,
  loading,
  btnStyleType,
  ...rest
}) {
  return (
    <Button
      type={btnStyleType}
      htmlType={type}
      className={btnClass}
      style={cssStyle}
      disabled={disabled}
      loading={loading}
      onClick={onclick}
      {...rest}
    >
      {text}
    </Button>
  );
}
export default MainButton;
// import React from "react";
// import "./MainButton.scss";
// function MainButton({ text, btnClass, onclick, type, cssStyle, disabled }) {
//   return (
//     <>
//       <Button
//         variant="outline-success"
//         className={"mainButton " + btnClass ? btnClass : ""}
//         onClick={onclick ? onclick : () => ""}
//         type={type ? type : null}
//         style={cssStyle ? cssStyle : {}}
//         disabled={disabled ? disabled : 0}
//       >
//         {text}
//       </Button>
//     </>
//   );
// }
// export default MainButton;

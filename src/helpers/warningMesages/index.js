import './index.scss';
const WarningMessage = ({ message }) => {
  return (
    <div className="message-container">
      <span className="warning-word">Warning :</span> {message}
    </div>
  );
};

export default WarningMessage;

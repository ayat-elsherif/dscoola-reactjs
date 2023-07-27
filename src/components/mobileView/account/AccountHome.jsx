import ArrowForward from '../../../assets/svg/ArrowForward';
import ProfilePicture from './profilePicture/ProfilePicture';
// import MainNavbar from 'Components/home/navbar/MainNavbar';
import { Link } from 'react-router-dom';
import './accountHome.scss';
import { dashSections } from './accountSectionsData';
import { useState } from 'react';
import { Modal, Drawer, Radio, Button } from 'antd';
export default function AccountHome() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // setIsModalOpen(false);
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const allDashboardSections = dashSections?.map((item, i) => {
    if (item?.url == 'signout' || item?.url == 'language') {
      return (
        <Link to={`#`} key={i} className="dashboard-section-link">
          <section
            className="dashboard-section-item"
            onClick={item?.url == 'signout' ? showModal : showDrawer}
          >
            <div className="dashboard-section-title">
              <span>{item.icon}</span>
              <h5>{item.sectionName}</h5>
            </div>
            <div className="dashboard-section-ArrowRight">
              <ArrowForward />
            </div>
          </section>
        </Link>
      );
    } else {
      return (
        <Link to={`/${item.url}`} key={i} className="dashboard-section-link">
          <section className="dashboard-section-item">
            <div className="dashboard-section-title">
              <span>{item.icon}</span>
              <h5>{item.sectionName}</h5>
            </div>
            <div className="dashboard-section-ArrowRight">
              <ArrowForward />
            </div>
          </section>
        </Link>
      );
    }
  });
  return (
    <>
      <div className="main-dashboard">
        <header className="dashboard-header">
          <div className="header-details">
            <h4>Account</h4>

            <ProfilePicture
              imageUrl={'/frontend/infixlmstheme/img/course/8.jpg'}
            />
            <h3 className="author-name">Albert Dera</h3>
          </div>
        </header>
        <main className="dashboard-body"> {allDashboardSections}</main>
      </div>
      <Drawer
        title="Choose Language"
        placement="bottom"
        onClose={onClose}
        height={200}
        open={open}
        closable={false}
        rootClassName="language-drawer"
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>English</Radio>
          <Radio value={2}>Arabic</Radio>
        </Radio.Group>
      </Drawer>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        // confirmLoading={true}
        onCancel={handleCancel}
        closable={false}
        wrapClassName="signout-modal"
        footer=""
      >
        <div className="signout-modal-body">
          <h4>Signout</h4>
          <p>Are you sure you want to Signout?</p>
          <div className="button-group">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk} loading={confirmLoading}>
              SignOut
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

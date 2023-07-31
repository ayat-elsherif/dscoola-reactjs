import ArrowForward from '../../../assets/svg/ArrowForward';
import ProfilePicture from './profilePicture/ProfilePicture';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/react-query/queryKeys';
// import MainNavbar from 'Components/home/navbar/MainNavbar';
import { Link, useNavigate } from 'react-router-dom';
import './accountHome.scss';
import { accountItems } from './accountSectionsData';
import { setCurrentUser } from 'features/user/user';
import { useState } from 'react';
import { Modal, Drawer, Radio, Button, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SignOutOutlineIcon from 'assets/svg/dashboard/SignOutOutlineIcon';
export default function AccountHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const { currentUser } = useSelector((state) => state?.user);

  const queryClient = useQueryClient();

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onLogout = () => {
    // setIsModalOpen(false);
    setConfirmLoading(true);

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    queryClient.removeQueries([queryKeys.cartInfo]);
    queryClient.removeQueries([queryKeys.notifList]);
    dispatch(setCurrentUser(null));
    navigate('/sign-in');
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

  const onClick = (e) => {
    console.log('click ', e);
  };

  const tryingAccountItems = accountItems?.filter(
    (item) => item.role === currentUser.role_id,
  );
  console.log(tryingAccountItems, 'tryingAccountItems');

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
        <main className="dashboard-body">
          <Menu onClick={onClick} mode="inline" items={tryingAccountItems} />
          <Link
            to={`#`}
            key={accountItems.length + 1}
            className="dashboard-section-link"
          >
            <section className="dashboard-section-item" onClick={showModal}>
              <div className="dashboard-section-title">
                <span>
                  <SignOutOutlineIcon />
                </span>
                <h5>Logout</h5>
              </div>
            </section>
          </Link>
        </main>
      </div>

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={onLogout}
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
            <Button onClick={onLogout} loading={confirmLoading}>
              SignOut
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

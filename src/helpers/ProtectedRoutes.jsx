import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('access_token');
  if (!token || token === 'undefined') {
    return true;
  } else return false;
};

const ProtectedRoutes = () => {
  let navigate = useNavigate();
  const isAuth = useAuth();
  // return isAuth ? navigate('/sign-in') : <Outlet />;
};

export default ProtectedRoutes;

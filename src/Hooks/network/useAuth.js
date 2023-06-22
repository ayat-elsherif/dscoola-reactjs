import useServicesCtx from 'hooks/useServicesCtx';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import useApi from '../../services/api/useApi';
import useUser from './useUser';

function useAuth() {
  // const [authLoading, setAuthLoading] = useState(false);
  const { authLoading, setAuthLoading } = useServicesCtx();
  const { updateUser, clearUser } = useUser();
  const history = useHistory();
  const api = useApi();

  async function authServerCall(endpoint, data = {}, noMsg) {
    try {
      setAuthLoading(true);
      const res = await api.post(endpoint, data);
      setAuthLoading(false);

      if (res?.code === 200) {
        if (!noMsg) toast.success(res?.message);
      } else {
        res.validation?.map(msg => {
          return toast.error(msg);
        });
      }

      console.log(res);
      return res;
    } catch (error) {
      setAuthLoading(false);
      console.log('Auth error', error?.message);
    }
  }
  //
  async function signup(formData) {
    const res = await authServerCall('/register', formData);
    console.log(res);
    if (res.code === 200) {
      // localStorage.setItem('userId', res.item);
      localStorage.setItem('userId', res.item?.user_id);
      history.push('/EnterCode');
      return res.item;
    }
    return false;
  }

  async function verifyCode(formData) {
    const res = await authServerCall(
      '/verify/registration/code',
      formData,
      'noMsg'
    );

    if (res.code === 200) {
      const userData = res?.data.user;
      const token = res?.message;
      const user = { ...userData, token };
      console.log(user);

      updateUser(user);
      toast.success('welcome ' + user.first_name_en);
      history.push('/GotVerified');
      return true;
    }

    return false;
  }

  async function signin(formData) {
    const res = await authServerCall('/login', formData, 'noMsg');
    console.log(res);
    if (res.code === 200) {
      const userData = res?.data.user;
      const token = res?.message;
      const user = { ...userData, token };
      console.log(user);

      updateUser(user);
      toast.success('welcome back ' + user.first_name_en);
      history.push('/');

      return true;
    }

    // toast.error('The phone number or password is incorrect.');
    return false;
  }

  async function signinProvider(formData) {
    const res = await authServerCall('/login/provider', formData);
    console.log(res);
    if (res.code === 200) {
      const userData = res?.data.user;
      const token = res?.message;
      const user = { ...userData, token };
      console.log(user);

      updateUser(user);
      toast.success('welcome back ' + user.first_name);

      return true;
    }

    toast.error('The phone number or password is incorrect.');
    return false;
  }

  async function signout() {
    clearUser();
    toast.info('Signed out');
    history.push('/');
    const res = await authServerCall('/logout');
    if (res.code === 200) {
      history.push('/');
      clearUser();
      console.log('logout');
    }
    return res;
  }

  async function forgotPassword(formData) {
    const res = await authServerCall('/forgot/password', formData);
    console.log(res);
    if (res.code === 200) {
      history.push('/EnterNewPassword');
      return res.item;
    }

    return false;
  }

  async function resetPassword(formData) {
    const res = await authServerCall(
      '/reset/forgot/password',
      formData,
      'noMsg'
    );
    if (res.code === 200) {
      const userData = res?.data.user;
      const token = res?.message;
      const user = { ...userData, token };

      updateUser(user);
      toast.success('welcome back ' + user.first_name_en);
      history.push('/PassordChanged');

      return true;
    }

    // toast.error('The phone number or password is incorrect.');
    return false;
  }
  async function resendCode(formData) {
    const res = await authServerCall('/resend/code', formData);
    return res;
  }

  return {
    signin,
    signinProvider,
    signup,
    signout,
    verifyCode,
    forgotPassword,
    resetPassword,
    resendCode,
    authLoading,
  };
}

export default useAuth;

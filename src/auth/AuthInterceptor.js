import axios from 'axios';
import { env } from '../configs/EnvironmentConfig';
// import { toast } from 'react-toastify';
import { notification } from 'antd';
import history from '../history';
const service = axios.create({
  baseURL: env.API_ENDPOINT_URL,
  timeout: 60000,
});

// Config

const ENTRY_ROUTE = '/sign-in';

const TOKEN_PAYLOAD_KEY = 'Authorization';
const PUBLIC_REQUEST_KEY = 'public-request';

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    // debugger;
    if (token) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${token}`;
    }

    if (!token && !config.headers[PUBLIC_REQUEST_KEY]) {
      history.push(ENTRY_ROUTE);
      window.location.reload();
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: 'Error',
    });
    Promise.reject(error);
  },
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Remove token and redirect
    if (error?.response?.status === 401) {
      // toast.error('not Authorized');
      // history.push(ENTRY_ROUTE);
      // window.location.reload();
      // localStorage.removeItem("access_token");
    }

    if (error?.response?.status === 404) {
      // toast.error('Not Found');
      // history.push(ENTRY_ROUTE);
      // window.location.reload();
    }

    if (error?.response?.status === 500) {
      // toast.error('Internal Server Error');
      // notification.error({
      //   message: 'Internal Server Error',
      // });
    }

    if (error?.response?.status === 508) {
      // toast.error('Time Out');

      notification.error({
        message: 'Time Out',
      });
    }

    return Promise.reject(error);
  },
);

export default service;

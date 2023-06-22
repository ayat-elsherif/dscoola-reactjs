import { QueryClient } from '@tanstack/react-query';
import { message } from 'antd';

// const notif = (msg, rest, type = 'error') =>
//   notification[type]({
//     message: msg,
//     placement: type === 'error' ? 'top' : 'topRight',
//     ...rest,
//   });

const stampMsg = `Sorry. something went wrong.`;

const onErrorHandler = (error) => {
  console.log('onError Global', error.toString());
  console.log('onError Global', error?.response);
  console.log('onError Global', error?.message);
  const code = error?.response?.status;

  if (code < 400 || code >= 500) {
    // notif(
    //   'Sorry. something went wrong .A team of highly trained developers has been dispatched to deal with this situation!',
    //   { duration: 10000 },
    // );
    message.error(
      'Sorry. something went wrong .A team of highly trained developers has been dispatched to deal with this situation!',
    );

    return false;
  }

  // if (code === 401) {
  //   localStorage.clear();
  //   window.location.replace('/');
  //   return null;
  // }

  message.error(error?.response?.message || error.toString());
  // notif(error?.response?.data?.message || error.toString());
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 2, // means queries will not refetch their data as often
      // cacheTime: 1000 * 60 * 7,
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      retry: 2,
      onSuccess: (res) => {
        // console.log('onSuccess Global queries', res);
        // if (res?.code !== 200) {
        //   notif(res?.message, null, 'success');
        // }
        // if (res?.validation) {
        //   res.validation?.forEach((err) => {
        //     notif(err);
        //   });
        // }
      },
      onError: onErrorHandler,
      networkMode: 'always',
    },
    mutations: {
      onSuccess: (res) => {
        console.log('onSuccess Global mutations', res);
        if (res.success) {
          let textMsg = '';

          const msgPos1 = res?.message;
          const msgPos2 = res?.data?.message;
          const msgPos3 = res?.success?.message;

          if (msgPos1 === '' || msgPos2 === '' || msgPos3 === '')
            textMsg = 'Empty message from backend!!';
          message.success({
            content: msgPos1 || msgPos2 || msgPos3 || textMsg || stampMsg,
            duration: 5,
          });
        }
        // if (res?.validation) {
        //   res.validation?.forEach((err) => {
        //     notif(err);
        //   });
        // }
      },
      onError: onErrorHandler,
      networkMode: 'always',
    },
  },
});

export default queryClient;

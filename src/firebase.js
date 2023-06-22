import { notification } from 'antd';
import { initializeApp } from 'firebase/app';
import { BellFilled } from '@ant-design/icons';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
const firebaseConfig = {
  apiKey: 'AIzaSyDc80c3vt_sfEB_Z8ADR4r2Z4JJQpVu1n8',
  authDomain: 'd-scoola.firebaseapp.com',
  projectId: 'd-scoola',
  storageBucket: 'd-scoola.appspot.com',
  messagingSenderId: '959063371428',
  appId: '1:959063371428:web:be1e2cf5610262100dc031',
  measurementId: 'G-ZJPJD0HP9Z',
};

initializeApp(firebaseConfig);
const messaging = getMessaging();
export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      'BOC5Bqgv2fOc22ELwTH_MvDMb0gLp7bJ8VguUlwGXX-tCkPkbbzsiyX4ienA4vvOEtnUxOY0yLRe9A5Ea_Sle1o',
  })
    .then((currentToken) => {
      if (currentToken) {
        // Perform any other neccessary action with the token
        return currentToken;
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.',
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = (onSuccessfcm) =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload, 'aaaaaaaaaaaaaaaaa');
      notification.success({
        message: payload?.notification?.title,
        description: payload?.notification?.body,
        icon: <BellFilled style={{ color: '#7e59d1' }} />,
      });
      onSuccessfcm(payload);
    });
  });

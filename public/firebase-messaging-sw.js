// Scripts for firebase and firebase messaging

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js');
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyDc80c3vt_sfEB_Z8ADR4r2Z4JJQpVu1n8',
  authDomain: 'd-scoola.firebaseapp.com',
  projectId: 'd-scoola',
  storageBucket: 'd-scoola.appspot.com',
  messagingSenderId: '959063371428',
  appId: '1:959063371428:web:be1e2cf5610262100dc031',
  measurementId: 'G-ZJPJD0HP9Z',
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  //   notification.open({
  //     message: payload?.notification?.title,
  //     description: payload?.notification?.body,
  //   });
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: '/logo192.png',
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

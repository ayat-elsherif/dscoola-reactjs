import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { loadStripe } from '@stripe/stripe-js';
import QueryProvider from './services/react-query';
import 'react-quill/dist/quill.snow.css';
import 'vmsg/vmsg.css';

let persistor = persistStore(store);

export const stripePromise = loadStripe(
  'pk_test_51Jwk8wHdpKqpVhJcvH9tqkgh03fSz4pH3p9cfJfNLsEFTg3iUET3FjFwcc3YSKUs3TPTWoT14F6EYEJFKJEKf1SZ00P13uCULD',
);
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </PersistGate>
  </Provider>,
);

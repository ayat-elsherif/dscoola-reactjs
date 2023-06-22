import React from 'react';
import RoutesWrapper from './RoutesWrapper';
import { ConfigProvider } from 'antd';
import { onMessageListener, requestForToken } from './firebase';
import { useSelector } from 'react-redux';
import useApi from 'network/useApi';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

function App() {
  const { currentUser } = useSelector((state) => state?.user);
  const queryClient = useQueryClient();

  const api = useApi();

  useEffect(() => {
    if (currentUser) {
      handelAddNotification();
      onMessageListener((payload) => {
        // console.log(payload, 'payloadpayloadpayloadpayload');
        queryClient.invalidateQueries([`notif-list`]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelAddNotification = async () => {
    const userToken = await requestForToken();
    let body = {
      token: userToken,
    };
    if (userToken) {
      api.post('my/store-token', body).then(
        (res) => {},
        (err) => {},
      );
    }
  };

  // const client = ZoomMtgEmbedded.createClient();
  // window.client = client;
  // let meetingSDKElement = document.getElementById("meetingSDKElement");

  const validateMessages = {
    required: `please input field data`,
  };

  const searchClient = algoliasearch(
    'SDEBPBV2PY',
    'ecbabce3464dbcefab9fa1643208499c',
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7e59d1',
          colorLink: '#2a2a2a',
          colorLinkHover: '#7e59d1',
          borderRadius: 4,
        },
        components: {
          Radio: {
            colorPrimary: '#7e59d1',
          },
          Checkbox: {
            borderRadius: 4,
          },
        },
      }}
      form={{ validateMessages, requiredMark: false }}
      virtual
    >
      <InstantSearch indexName="courses" searchClient={searchClient}>
        <RoutesWrapper />
      </InstantSearch>
    </ConfigProvider>
  );
}

export default App;

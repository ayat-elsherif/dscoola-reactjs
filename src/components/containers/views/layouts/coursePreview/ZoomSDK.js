import React, { useEffect } from 'react';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import coursesAPI, { protectAxios } from '../../../../../apis/coursesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getZoomSDK } from '../../../../../features/zoomSDKSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const KJUR = require('jsrsasign');

function ZoomSDK({ zoomObj }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // window.scrollTo(0, 0);
    const fetchZoomSDK = async () => {
      const response = await protectAxios
        .post(
          `user/zoom-generate-signature?meeting_number=${zoomObj?.meeting_id}`,
        )
        .catch((err) => {
          console.log(err, 'redirecting to join zoom');
          window.open(zoomObj?.url);
        });
      // console.log(response.data.data, "generate");

      dispatch(getZoomSDK(response.data.data));
    };
    fetchZoomSDK();
  }, []);
  // const fetchZoomSDK = async () => {
  //   return await fetch({
  //     url: `user/zoom-generate-signature?`,
  //     method: "post",
  //     headers: {
  //       "public-request": "true",
  //     },
  //     data: { meeting_number: zoomObj?.meeting_id },
  //   });
  //   // return await protectAxios.post(
  //   //   `user/zoom-generate-signature?meeting_number=${zoomObj?.meeting_id}`
  //   // );
  // };

  // isSuccess = (data) => {
  //   console.log(data.data, "generate");
  //   dispatch(getZoomSDK(data.data));
  // };
  // const { isLoading, isSuccess, isError } = useMutation(
  //   ["zoomSDK"],
  //   fetchZoomSDK()
  // );
  const ourClient = ZoomMtgEmbedded.createClient();

  let meetingSDKElement = document.getElementById('meetingSDKElement');

  // const sdkKey = "MPQWS9TLKzABVtSKccEAnmTapIn6HByIRWcN";
  // const sdkSecret = "AJBumsQi8larSkeOldD2dqtkU9uZIe71ahmP";
  // const meetingNumber = 76536478025;
  // const generateSignature = (sdkKey, sdkSecret, meetingNumber, role) => {
  //   const iat = Math.round((new Date().getTime() - 30000) / 1000);
  //   const exp = iat + 60 * 60 * 2;
  //   const oHeader = { alg: "HS256", typ: "JWT" };
  //   console.log(zoomObj, "zoomObj zoomObj");
  //   const oPayload = {
  //     sdkKey: sdkKey,
  //     mn: meetingNumber,
  //     role: role,
  //     iat: iat,
  //     exp: exp,
  //     appKey: sdkKey,
  //     tokenExp: iat + 60 * 60 * 2,
  //   };

  //   const sHeader = JSON.stringify(oHeader);
  //   const sPayload = JSON.stringify(oPayload);
  //   const sdkJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  //   return sdkJWT;
  // };

  // const user_id = JSON.parse(user);

  // const role = zoomObj?.created_by == user_id?.user_id ? 1 : 0;
  // const signature = generateSignature(
  //   sdkKey,
  //   sdkSecret,
  //   zoomObj?.meeting_id,
  //   role
  // );

  // client.init({ zoomAppRoot: meetingSDKElement, language: "en-US" });
  // client.join({
  //   sdkKey: sdkKey,
  //   signature: signature,
  //   meetingNumber: zoomObj?.meeting_id,
  //   password: zoomObj?.password,
  //   userName: "ayat_elsherif@yahoo.com ",
  // });

  // console.log(signature, "signatureStatic");
  // console.log(zoomObj?.created_by, user_id?.user_id, "createbBy & id");
  const zoomSDK = useSelector((state) => state.zoomSDK.zoomSDK);
  console.log(zoomSDK?.signatureToken, ' zoomSDK?.signatureToken');
  meetingSDKElement.classList.add('meetingSDKElement');

  ///////////////////////////////////////////////////////////////

  ourClient.init({
    // leaveUrl: "/webinars",
    zoomAppRoot: meetingSDKElement,
    language: 'en-US',
    leaveUrl: '/webinars',
    customize: {
      video: {
        isResizable: true,
        video: {
          popper: {
            placement: 'right',
          },
        },
        viewSizes: {
          default: {
            width: 900,
            height: 500,
          },
          ribbon: {
            width: 900,
            height: 500,
          },
        },
      },
    },
    success: function (res) {
      console.log('Join Meeting Success');
    },
    error: function (res) {
      console.log(res, 'resres');
    },
  });

  ourClient.join({
    sdkKey: zoomSDK?.sdk_key,
    signature: zoomSDK?.signatureToken,
    meetingNumber: zoomObj?.meeting_id,
    password: zoomObj?.password,
    userName: zoomSDK?.zoom_email,
    success: function (res) {
      console.log('Join Meeting Success');
    },
    error: function (res) {
      console.log(res, 'resres');
    },
  });
  console.log(ourClient, 'client');

  window.ourClient = ourClient;

  // window.ourClient.on("event_connection_change", (payload) => {
  //   console.log("meetingStatus", payload);
  // });

  // window.ourClient.on("current-audio-change", (payload) => {
  //   console.log("Joined by ", payload.type);
  // });
  // client.leaveMeeting((data) => {
  //   console.log(data, "ended");
  // });

  // client.on("command-channel-status", (payload) => {
  //   console.log("from %s, messagesss:%s", payload);
  // });

  // client.on("user-added", (payload) => {
  //   // You can refresh the participants when
  //   const participants = client.getParticipantsList();
  //   console.log("user added");
  // });

  // client.on("active-speaker", (payload) => {
  //   console.log(`Active user:`, payload);
  // });

  // client.inMeetingServiceListener("onUserLeave", function (data) {
  //   console.log(data, "onUserLeave");
  // });
  // client.inMeetingServiceListener("onMeetingStatus", function (data) {
  //   // {status: 1(connecting), 2(connected), 3(disconnected), 4(reconnecting)}
  //   console.log(data, "onMeetingStatus");
  // });
  // console.log(
  //   generateSignature(sdkKey, sdkSecret, zoomObj?.meeting_id, 1),
  //   "checkme"
  // );
  // console.log(
  //   zoomObj?.meeting_id,
  //   "meeting no,",
  //   zoomObj?.role,
  //   "role,",
  //   zoomObj?.password,
  //   "password"
  // );
  return <div></div>;
}

export default ZoomSDK;

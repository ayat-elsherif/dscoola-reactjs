import React, { useEffect } from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import logo from "../../logo.svg";
import { useDispatch, useSelector } from "react-redux";

function ZoomSDKPage() {
  //   console.log(zoomObj, "zoomObj");
  //   const dispatch = useDispatch();

  const zoomObj = useSelector((state) => state.zoomSDK.zoomObj);
  console.log(zoomObj, "zoomObjinCard");
  useEffect(() => {
    window.scrollTo(0, 0);
    startMeeting();
  }, []);
  const client = ZoomMtgEmbedded.createClient();
  const zoomSDK = useSelector((state) => state.zoomSDK.zoomSDK);
  console.log(zoomSDK, "zoomSDKFromRedux");
  function startMeeting() {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      // leaveUrl: "/webinars",
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      leaveUrl: "/webinars",
      customize: {
        video: {
          isResizable: true,
          video: {
            popper: {
              placement: "top",
            },
          },
          viewSizes: {
            default: {
              width: 1000,
              height: 600,
            },
            ribbon: {
              width: 1000,
              height: 600,
            },
          },
        },
      },
      success: function (res) {
        console.log("Join Meeting Success");
      },
      error: function (res) {
        console.log(res, "resres");
      },
    });

    client.join({
      sdkKey: zoomSDK?.sdk_key,
      signature: zoomSDK?.signatureToken,
      meetingNumber: zoomObj?.meeting_id,
      password: zoomObj?.password,
      userName: zoomSDK?.zoom_email,
      success: function (res) {
        console.log("Join Meeting Success");
        // const endMeetingButton = document.querySelector(
        //   "zmwebsdk-makeStyles-danger"
        // );
        // console.log(endMeetingButton, "endMeetingButton");
      },
      error: function (res) {
        console.log(res, "resres");
      },
    });
  }

  return (
    <div className="zoomSdkContainer">
      <div id="meetingSDKElement"></div>
      <div className="defaultCourePreview">
        <img src={logo} alt={"scoola"} />
      </div>
    </div>
  );
}

export default ZoomSDKPage;

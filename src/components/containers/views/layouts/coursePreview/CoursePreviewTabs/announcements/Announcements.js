import React, { useState, useEffect } from "react";
import TitleWithButton from "../../CoursePreviewTabs/TitleWithButton";
import NotFoundTab from "../../NotFoundTab";
import SingleAnnouncement from "./SingleAnnouncement";
import coursesAPI from "../../../../../../../apis/coursesAPI";
function Announcements() {
  const [fetchResponse, setFetchResponse] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await coursesAPI
        .get("/announcements/course/6241afa8a12b0aef874e2f78")
        .catch((err) => console.log("err", err));
      setFetchResponse(response.data);
    };
    fetchCourses();
  }, fetchResponse);
  let dataFromEndpoint = () => {
    return fetchResponse.map((item, i) => (
      <SingleAnnouncement i={i} id={i} response={item} />
    ));
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <TitleWithButton
        title=" Announcements"
        isButton={false}
        onclick={handleShow}
      />
      {dataFromEndpoint().length > 0 ? (
        dataFromEndpoint()
      ) : (
        <NotFoundTab
          title={"No announcements posted yet."}
          detailOne={
            "The instructor hasn't added any announcements to this course yet."
          }
          detailTwo={
            "Announcements are used to inform you of updates or additions to the course."
          }
        />
      )}
    </div>
  );
}

export default Announcements;

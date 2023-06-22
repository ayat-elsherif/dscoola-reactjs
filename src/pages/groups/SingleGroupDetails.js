import React, { useEffect } from "react";
import WriteReview from "../../helpers/review/WriteReview";
import YourInstractor from "../../helpers/cards/userCard/UserCard";
import BreadCrumbsMultiple from "../../helpers/breadCrumbs/BreadCrumbsMultiple";
import Reviewings from "../courses/courseView/Reviewings";
import DetailsCard from "../../helpers/cards/detailsSideCard/DetailsSideCard";
import { useParams } from "react-router-dom";
import {
  fetchSingleGroup,
  fetchStart,
} from "../../features/yallaonline/singleGroup";
import { protectAxios } from "../../apis/coursesAPI";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
function SingleGroupDetails() {
  const param = useParams();
  const dispatch = useDispatch();
  let roomMeetingArr;
  let details = {};
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchStart());
    const getSingleGroup = async () => {
      // dispatch(fetchStart());
      const response = await protectAxios

        .get(`yallaonline/${param.group_id}`)
        .catch((err) => console.log("err", err));

      dispatch(fetchSingleGroup(response.data.data));
    };
    getSingleGroup();
  }, []);
  const singleGroup = useSelector((state) => state.singleGroup.singleGroup);
  const loading = useSelector((state) => state.singleGroup.loading);

  if (singleGroup && Object.keys(singleGroup).length === 0) {
    return null;
  } else {
    details = {
      created_by: singleGroup?.room_meetings[0]?.created_by,
      start_time: singleGroup?.room_meetings[0]?.start_time,
      duration: `${singleGroup?.room?.duration} Mins`,
      category: singleGroup?.category,
      time_zone: singleGroup?.time_zone,
      end_time: singleGroup?.room_meetings[0]?.end_time,
    };
  }

  console.log(details, "details in singleGroupDetails");
  return (
    <>
      {loading ? (
        <div className="container" style={{ padding: "3rem 0" }}>
          <Skeleton active></Skeleton>
          <Skeleton active></Skeleton>
          <Skeleton active></Skeleton>
          <Skeleton active></Skeleton>
          <Skeleton active></Skeleton>
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div className="singleWebinar">
          <BreadCrumbsMultiple
            params={[
              { label: singleGroup?.category_slug, url: "/categories/:id" },
              {
                label: singleGroup?.course_slug,
                url: "/courses/excel-from-beginner-to-advanced2",
              },
              { label: singleGroup?.room?.title },
            ]}
            title={singleGroup?.room?.title}
          />
          <div className="container">
            <div className="heroImgWebinar">
              <img
                src={
                  singleGroup?.room?.image
                    ? singleGroup?.room?.image
                    : "/assets/images/events/course-group.jpg"
                }
                alt={singleGroup?.room?.title}
              />
            </div>
            <div className="row mt-5">
              <div className="col-lg-8">
                <div className="webinarAbout">
                  <h4>About This Meeting</h4>
                  {roomMeetingArr?.description ? (
                    singleGroup?.room_meetings[0]?.description
                  ) : (
                    <p>
                      Do you feel that you already know all possible frameworks
                      of business problem solving (Porter’s five forces, the
                      BCG-matrix etc.), yet you are still not confident in using
                      them? Or maybe you already took a course on management
                      consulting problem solving approach, but the jargon used
                      didn’t make much practical sense to you (The 80/20 rule,
                      MECE etc.)? Whether you’re a student studying for case
                      interviews or a businessperson, what you might be lacking
                      is a comprehensive aproach to problem solving that
                      generates consistent results.. If so, this course is for
                      you! I can guarantee you will not find another such
                      comprehensive introductory course on hypothesis-based
                      problem solving – the top consulting firms’ technique of
                      choice on all kinds of business consulting engagements.
                    </p>
                  )}
                </div>
                <div className="hostedBy">
                  <YourInstractor instructor={"Hosted By"} />
                </div>
              </div>
              <div className="col-lg-4">
                <DetailsCard details={details ? details : ""} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleGroupDetails;

import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import "./index.scss";
import CourseStructure from "./steps/courseStructure";
import IntendedLearners from "./steps/intendedLearners";
import { Outlet, useNavigate } from "react-router-dom";
import { BackArrowIcon } from "../../../../../assets/svg";
import CreateCourseMenu from "./menu";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../../../../auth/AuthInterceptor";
import { useDispatch } from "react-redux";
import {
    courseAddPipline,
    fetchStart,
} from "../../../../../features/courseContent/courseAddPipline";

function Index() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSuccess = (data) => {
        dispatch(courseAddPipline(data.menuJson));
    };

    const onError = (data) => {};

    const { isLoading, data } = useQuery(
        [`add-course`],
        () => {
            return fetch({
                url: `api/lecture/course-state?course_id=${localStorage.getItem(
                    "live-course-id"
                )}`,
                method: "get",
                headers: {
                    "public-request": "true",
                },
            });
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
    dispatch(fetchStart(isLoading));
    return (
        <div className="create-course">
            <div className="create-course_header">
                <div className="title">
                    <h5>Create Courses</h5>
                    <p>Fill in the data below</p>
                </div>
                <div
                    className="back"
                    onClick={() => navigate("/instructor-dashboard/courses")}
                >
                    <BackArrowIcon /> Back
                </div>
            </div>
            <div className="steps-conatiner">
                <CreateCourseMenu />
                <div className="steps-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Index;

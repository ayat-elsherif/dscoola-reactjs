import { useMutation, useQuery } from "@tanstack/react-query";
import CoursesService from "../../services/CoursesServices";


const addReview = (slug,data) => {
    return CoursesService.addReview(slug,data);
};
export const useAddReview = (onSuccess, onError) => {
    return useMutation(addReview, {
        onSuccess,
        onError,
    });
};
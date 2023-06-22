import { useMutation } from '@tanstack/react-query';
import InstructorCoursesServices from '../../../../../../services/instructorServices/CoursesServices';

const deleteCourse = (id) => {
  return InstructorCoursesServices.deleteCourse(id);
};

export const useDeleteCourse = (onSuccess, onError) => {
  return useMutation(deleteCourse, {
    onSuccess,
    onError,
  });
};

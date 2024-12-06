import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { enrolledCourseServices } from './EnrolledCourse.services';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await enrolledCourseServices.createEnrolledCourseIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course enroll successfully!',
    data: result,
  });
});

export const enrolledCourseControllers = {
  createEnrolledCourse,
};

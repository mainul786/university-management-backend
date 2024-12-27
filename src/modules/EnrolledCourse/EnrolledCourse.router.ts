import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { EnrolledCourseValidations } from './EnrolledCourse.validation';
import { enrolledCourseControllers } from './EnrolledCourse.controllers';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USERROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationSchema,
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks,
);
export const EnrolledCourseRouter = router;

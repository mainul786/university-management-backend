import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { EnrolledCourseValidations } from './EnrolledCourse.validation';
import { enrolledCourseControllers } from './EnrolledCourse.controllers';
import auth from '../../middlware/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRouter = router;

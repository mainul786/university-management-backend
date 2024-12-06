import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { EnrolledCourseValidations } from './EnrolledCourse.validation';
import { enrolledCourseControllers } from './EnrolledCourse.controllers';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRouter = router;

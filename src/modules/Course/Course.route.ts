import express from 'express';
import { CourseController } from './Course.controller';
import validateRequest from '../../middlware/validateRequest';
import { CourseValidation } from './Course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/:id', CourseController.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourse);

export const CourseRouters = router;

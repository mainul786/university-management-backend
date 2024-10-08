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

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidation),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidation),
  CourseController.removeFacultiesWithCourse,
);

router.get('/', CourseController.getAllCourse);

export const CourseRouters = router;

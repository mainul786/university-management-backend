import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { OfferedCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.get('/', OfferedCourseController.getAllOfferedCourse);

router.delete('/:id', OfferedCourseController.deleteOfferedCourse);
export const OfferedCourseRouters = router;

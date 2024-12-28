import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { OfferedCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/create-offered-course',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.get(
  '/:id',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty, USERROLE.student),
  OfferedCourseController.getSingleOfferedCourse,
);
router.patch(
  '/:id',
  auth(USERROLE.admin, USERROLE.superAdmin),
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.get(
  '/',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  OfferedCourseController.getAllOfferedCourse,
);

router.get(
  '/my-offered-courses',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty),
  OfferedCourseController.getMyOfferedCourse,
);

router.delete(
  '/:id',
  auth(USERROLE.admin, USERROLE.superAdmin),
  OfferedCourseController.deleteOfferedCourse,
);
export const OfferedCourseRouters = router;

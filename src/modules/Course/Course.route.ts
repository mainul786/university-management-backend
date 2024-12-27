import express from 'express';
import { CourseController } from './Course.controller';
import validateRequest from '../../middlware/validateRequest';
import { CourseValidation } from './Course.validation';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get(
  '/:id',
  auth(USERROLE.superAdmin, USERROLE.admin),
  CourseController.getSingleCourse,
);
router.patch(
  '/:id',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.delete(
  '/:id',
  auth(USERROLE.superAdmin, USERROLE.admin),
  CourseController.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty),
  validateRequest(CourseValidation.facultiesWithCourseValidation),
  CourseController.assignFacultiesWithCourse,
);
router.get(
  '/:courseId/get-faculties',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty),
  CourseController.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty),
  validateRequest(CourseValidation.facultiesWithCourseValidation),
  CourseController.removeFacultiesWithCourse,
);

router.get(
  '/',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty, USERROLE.student),
  CourseController.getAllCourse,
);

export const CourseRouters = router;

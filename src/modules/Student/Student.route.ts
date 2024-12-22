import express from 'express';
import { StudentController } from './Student.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from './Student.validation';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.get(
  '/',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  StudentController.getAllStudent,
);

router.get(
  '/:studentId',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  StudentController.getSingleStudent,
);

router.patch(
  '/:studentId',
  auth(USERROLE.admin, USERROLE.superAdmin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete(
  '/:studentId',
  auth(USERROLE.admin, USERROLE.superAdmin),
  StudentController.deleteStudent,
);

export const StudentRouter = router;

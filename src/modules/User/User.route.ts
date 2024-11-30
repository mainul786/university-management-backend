import express from 'express';
import { UserController } from './User.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from '../Student/Student.validation';
import { FacultyValidations } from '../Faculty/Faculty.validation';
import { AdminValidations } from '../Admin/Admin.validation';
import auth from '../../middlware/auth';
import { USERROLE } from './User.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USERROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USERROLE.admin),
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USERROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get('/me', auth('admin', 'faculty', 'student'), UserController.getMe);

export const UserRouter = router;

import express from 'express';
import { UserController } from './User.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from '../Student/Student.validation';
import { FacultyValidations } from '../Faculty/Faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRouter = router;

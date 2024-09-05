import express from 'express';
import { UserController } from './User.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from '../Student/Student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRouter = router;

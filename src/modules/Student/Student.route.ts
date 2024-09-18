import express from 'express';
import { StudentController } from './Student.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from './Student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudent);

router.get('/:studentId', StudentController.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRouter = router;

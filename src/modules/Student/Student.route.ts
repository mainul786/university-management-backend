import express from 'express';
import { StudentController } from './Student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudentController);
router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getSingleStudent);

export const studentRouter = router;

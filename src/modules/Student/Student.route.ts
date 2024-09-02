import express from 'express';
import { StudentController } from './Student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudentController);
router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

export const studentRouter = router;

import express from 'express';
import { StudentController } from './Student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRouter = router;

import express from 'express';
import { UserController } from './User.controller';
const router = express.Router();

router.post('/create-student', UserController.createStudent);

export const UserRouter = router;

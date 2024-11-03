import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { loginUserValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginUserValidation.authUserValidation),
  AuthController.userLogin,
);

export const AuthRouter = router;

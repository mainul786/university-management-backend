import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { loginUserValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginUserValidation.authUserValidation),
  AuthController.userLogin,
);

router.post(
  '/change-password',
  auth(USERROLE.admin, USERROLE.faculty, USERROLE.student),
  validateRequest(loginUserValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(loginUserValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
router.post(
  '/forget-password',
  validateRequest(loginUserValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(loginUserValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);

export const AuthRouter = router;

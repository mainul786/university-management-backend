import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './User.controller';
import validateRequest from '../../middlware/validateRequest';
import { studentValidations } from '../Student/Student.validation';
import { FacultyValidations } from '../Faculty/Faculty.validation';
import { AdminValidations } from '../Admin/Admin.validation';
import auth from '../../middlware/auth';
import { USERROLE } from './User.constant';
import { userValidation } from './User.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USERROLE.superAdmin, USERROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USERROLE.superAdmin, USERROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  auth(USERROLE.superAdmin, USERROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get(
  '/me',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty, USERROLE.student),
  UserController.getMe,
);
router.post(
  '/change-status/:id',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRouter = router;

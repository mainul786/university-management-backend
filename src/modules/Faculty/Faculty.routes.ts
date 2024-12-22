import express from 'express';
import { FacultyControllers } from './Faculty.controller';
import validateRequest from '../../middlware/validateRequest';
import { FacultyValidations } from './Faculty.validation';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.get(
  '/',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  FacultyControllers.getAllFaculty,
);
router.get(
  '/:id',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  FacultyControllers.singleFaculty,
);
router.patch(
  '/:id',
  auth(USERROLE.admin, USERROLE.superAdmin, USERROLE.faculty),
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete(
  '/:id',
  auth(USERROLE.admin, USERROLE.superAdmin),
  FacultyControllers.deleteFaculty,
);

export const FacultyRouters = router;

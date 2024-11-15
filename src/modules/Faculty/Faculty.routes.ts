import express from 'express';
import { FacultyControllers } from './Faculty.controller';
import validateRequest from '../../middlware/validateRequest';
import { FacultyValidations } from './Faculty.validation';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.get(
  '/',
  auth(USERROLE.admin, USERROLE.faculty),
  FacultyControllers.getAllFaculty,
);
router.get('/:id', FacultyControllers.singleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRouters = router;

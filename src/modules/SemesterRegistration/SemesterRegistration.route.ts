import express from 'express';
import validateRequest from '../../middlware/validateRequest';
import { semesterRegistrationValidations } from './SemesterRegistration.validation';
import { semesterRegistrationControllers } from './SemesterRegistration.controller';
import auth from '../../middlware/auth';
import { USERROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
router.patch(
  '/:id',
  auth(USERROLE.superAdmin, USERROLE.admin),
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);
router.get(
  '/:id',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty, USERROLE.student),
  semesterRegistrationControllers.singleSemesterRegistration,
);
router.get(
  '/',
  auth(USERROLE.superAdmin, USERROLE.admin, USERROLE.faculty, USERROLE.student),
  semesterRegistrationControllers.allSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
